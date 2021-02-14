import { useState } from 'react'
import Button from 'components/Button'

interface Props  {
  initValue: string
  onSubmit: (body: string) => void|Promise<void>
  keep?: boolean
}

export default function ReviewForm({ initValue, onSubmit, keep }: Props) {
  const [body, setBody] = useState(initValue)

  return (
    <form onSubmit={async (e) => {
      e.preventDefault()
      await onSubmit(body)
      if (!keep) {
        setBody('')
      }
    }}>
      <div>
        <textarea value={body} onChange={(event) => {
          setBody(event.target.value)
        }} />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  )
}
