'use client'

import { Form, FormSubmit, RenderFields, toast, useStepNav } from '@payloadcms/ui'
import { useEffect } from 'react'

export function TestForm() {
  const { setStepNav } = useStepNav()

  useEffect(() => {
    setStepNav([{ label: 'Importer' }])
  }, [])

  return (
    <Form
      className="document-fields__edit"
      initialState={{ text: { value: '', initialValue: '', valid: true } }}
      onSubmit={(data) => {
        toast.info(`Submitted ${data.text.value} ${Date.now()}`)
      }}
    >
      <RenderFields
        parentIndexPath=""
        parentPath=""
        parentSchemaPath="test"
        permissions={true}
        fields={[
          {
            name: 'text',
            type: 'text',
            label: 'Text',
          },
        ]}
        forceRender
        readOnly={false}
      />
      <FormSubmit>Submit!</FormSubmit>
    </Form>
  )
}
