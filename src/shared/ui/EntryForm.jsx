import { useForm } from 'react-hook-form';
import { entryApi } from '@/entities/entry/api/entryApi';

export const EntryForm = ({ entry = {}, onSuccess }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: entry });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);

      if (data.image?.[0]) {
        formData.append('image', data.image[0]); // Attach the image file if it exists
      }

      if (entry.id) {
        await entryApi.updateEntry(entry.id, formData); // Update existing entry
      } else {
        await entryApi.createEntry(formData); // Create new entry
      }

      if (onSuccess) onSuccess(); // Trigger success callback if provided
    } catch (error) {
      console.error('Error during entry submission:', error.message);
    }
  };

  const handleImageClear = () => {
    setValue('image', null); // Clear the image field
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      {/* Title Field */}
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          {...register('title', { required: 'Title is required' })}
          placeholder="Enter the title"
        />
        {errors.title && <p className="error">{errors.title.message}</p>}
      </div>

      {/* Description Field */}
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          {...register('description', { required: 'Description is required' })}
          placeholder="Enter the description"
        />
        {errors.description && <p className="error">{errors.description.message}</p>}
      </div>

      {/* Image Upload Field */}
      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          {...register('image')}
        />
        {entry.image && (
          <div className="image-preview">
            <img
              src={entry.image}
              alt="Current"
              style={{ maxWidth: '100px', marginTop: '10px' }}
            />
            <button
              type="button"
              onClick={handleImageClear}
              className="clear-image-btn"
            >
              Clear Image
            </button>
          </div>
        )}
        {errors.image && <p className="error">{errors.image.message}</p>}
      </div>

      {/* Submit Button */}
      <div className="form-group">
        <button type="submit" disabled={isSubmitting} className="submit-btn">
          {entry.id ? 'Update Entry' : 'Create Entry'}
        </button>
      </div>
    </form>
  );
};
