// src/entities/session/hooks/useLoginForm.js
export const useLoginForm = () => {
    const navigate = useNavigate()
    
    const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isSubmitting }
    } = useForm({
      resolver: zodResolver(loginSchema)
    })
  
    const onSubmit = async (data) => {
      try {
        await sessionApi.login(data)
        navigate('/')
      } catch (error) {
        setError('root', {
          message: error.message
        })
      }
    }
  
    return {
      register,
      handleSubmit: handleSubmit(onSubmit),
      errors,
      isSubmitting
    }
  }