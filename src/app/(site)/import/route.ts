import config from '@payload-config'
import { Field, getPayload, SanitizedCollectionConfig, SanitizedGlobalConfig } from 'payload'

type NamedField = Field & { name: string }

type FieldsWIthFields = Extract<Field, { fields: any }>['type']

function unwrapFields(input: Field[]): NamedField[] {
  return input
    .map((field) => {
      if ('name' in field) {
        if ('blocks' in field) {
          return {
            ...field,
            blocks: field.blocks.map((block) => ({ ...block, fields: unwrapFields(block.fields) })),
          }
        } else if ('fields' in field) {
          // Ensure `array` and `group` fields get processed as well.
          return { ...field, fields: unwrapFields(field.fields) }
        } else {
          // Field is present in the schema and there's nothing to unwrap.
          return field
        }
      }

      if (field.type === 'tabs') {
        return field.tabs
          .map((tab) => {
            if ('name' in tab) {
              return { type: 'group', name: tab.name, fields: unwrapFields(tab.fields) } as const
            } else {
              return unwrapFields(tab.fields)
            }
          })
          .flat()
      } else {
        return unwrapFields(field.fields)
      }
    })
    .flat()
}

function fieldMap(input: NamedField[]): Record<string, any> {
  return Object.fromEntries(
    input.map((field) => {
      if ('blocks' in field) {
        const blocks = field.blocks.map((block) => [
          block.slug,
          fieldMap(block.fields as NamedField[]),
        ])
        return [field.name, Object.fromEntries(blocks)]
      } else if ('fields' in field) {
        return [field.name, fieldMap(field.fields as NamedField[])]
      } else {
        return [field.name, true]
      }
    }),
  )
}

function normalizeSchema(
  input: SanitizedCollectionConfig | SanitizedGlobalConfig,
): Omit<SanitizedCollectionConfig | SanitizedGlobalConfig, 'fields'> & { fields: NamedField[] } {
  return { ...input, fields: unwrapFields(input.fields) }
}

function normalizeObject(input: Record<string, any>): (Record<string, any> & { id: string })[] {
  return Object.entries(input).map(([k, v]) => ({ ...v, id: k.split('_')[1] || k }))
}

function mergeContent(
  fields: NamedField[],
  current: Record<string, any>,
  input: Record<string, any>,
): Record<string, any> {
  console.log('merge', current, input)

  return Object.fromEntries(
    fields.map((field) => {
      const currentValue = current[field.name]
      const inputValue = input[field.name]
      if (!inputValue) return [field.name, currentValue]

      if (
        (field.type === 'group' || field.type === 'collapsible') &&
        currentValue &&
        typeof currentValue === 'object' &&
        typeof inputValue === 'object'
      ) {
        return [field.name, mergeContent(field.fields as NamedField[], currentValue, inputValue)]
      }

      if (field.type === 'array' && Array.isArray(currentValue) && typeof inputValue === 'object') {
        const inputItems = normalizeObject(inputValue)
        return [
          field.name,
          currentValue.map((currentItem) => {
            if (!('id' in currentItem)) return currentItem
            const inputItem = inputItems.find((item) => item.id === currentItem.id)
            if (!inputItem) return currentItem
            return mergeContent(field.fields as NamedField[], currentItem, inputItem)
          }),
        ]
      }

      if (
        field.type === 'blocks' &&
        Array.isArray(currentValue) &&
        typeof inputValue === 'object'
      ) {
        const inputItems = normalizeObject(inputValue)
        return [
          field.name,
          currentValue.map((currentItem) => {
            if (!('id' in currentItem)) return currentItem
            const inputItem = inputItems.find((item) => item.id === currentItem.id)
            if (!inputItem) return currentItem
            const blockSchema = field.blocks.find((block) => block.slug === currentItem?.blockType)
            if (!blockSchema) return currentItem
            return mergeContent(blockSchema.fields as NamedField[], currentItem, inputItem)
          }),
        ]
      }

      return [field.name, inputValue]
    }),
  )
}

export async function GET() {
  const payload = await getPayload({ config })

  const schema = payload.globals.config.find((t) => t.slug === 'test')
  if (!schema) throw new Error('No schema')

  const normalizedSchema = normalizeSchema(schema)
  // console.log(fieldMap(normalizedSchema.fields))

  const currentData = await payload.findGlobal({
    slug: 'test',
    locale: 'bg',
  })

  // TODO: test with collapsible field
  // TODO: test import with updated data

  const updatedData = mergeContent(normalizedSchema.fields, currentData, {
    text: 'new_bg____new_2',
    items: {
      asdfasdf_672f7534657be00050a825d0: {
        text: 'second_bg_2',
      },
      '672f8c08b0fe810050b0dd5a': {
        text: 'first_bg_2',
      },
    },
  })

  const updateResult = await payload.updateGlobal({
    slug: 'test',
    locale: 'bg',
    data: updatedData,
  })

  return new Response(JSON.stringify({ currentData, updateResult }))
}
