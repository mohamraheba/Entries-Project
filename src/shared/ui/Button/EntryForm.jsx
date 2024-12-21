import { useForm } from 'react-hook-form'
import { entryApi } from '@/entities/entry/api/entryApi'

export const EntryForm = ({ entry = {}, onSuccess }) => {
  const { 
    register, 
    handleSubmit, 
    setValue, 
    formState: { errors, isSubmitting } 
  } = useForm({ defaultValues: entry })

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    if (data.image?.[0]) {
      formData.append('image', data.image[0]) // Append the image if it exists
    }

    try {
      if (entry.id) {
        await entryApi.updateEntry(entry.id, formData) // Update existing entry
      } else {
        await entryApi.createEntry(formData) // Create new entry
      }
      if (onSuccess) onSuccess() // Call the success callback
    } catch (error) {
      console.error('Error submitting entry:', error.message)
    }
  }

  const handleImageClear = () => {
    setValue('image', null) // Clear the image field in the form
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title</label>
        <input 
          id="title" 
          {...register('title', { required: 'Title is required' })} 
          placeholder="Enter the title" 
        />
        {errors.title && <p className="error">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea 
          id="description" 
          {...register('description', { required: 'Description is required' })} 
          placeholder="Enter the description" 
        />
        {errors.description && <p className="error">{errors.description.message}</p>}
      </div>

      <div>
        <label htmlFor="image">Image</label>
        <input 
          id="image" 
          type="file" 
          accept="image/*" 
          {...register('image')} 
        />
        {entry.image && (
          <div>
            <img 
              src={entry.image} 
              alt="Current" 
              style={{ maxWidth: '100px', marginTop: '10px' }} 
            />
            <button 
              type="button" 
              onClick={handleImageClear}>
              Clear Image
            </button>
          </div>
        )}
      </div>

      {errors.image && <p className="error">{errors.image.message}</p>}

      <div>
        <button type="submit" disabled={isSubmitting}>
          {entry.id ? 'Update Entry' : 'Create Entry'}
        </button>
      </div>
    </form>
  )
}
