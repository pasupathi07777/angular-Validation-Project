// src/app/utils/validation.ts


export const validateForm = (data: any, type: string, toast: any): boolean => {
  const { userName, email, password } = data;

  if (!email) {
    toast.error('Email fields are required.');
    return false;
  }

  if (!password) {
    toast.error('Password fields are required.');
    return false;
  }

  if (type !== 'login') {
    if (!userName) {
      toast.error('Username is required.');
      return false;
    }

    if (userName.length < 5) {
      toast.error('Username must be at least 5 characters long.');
      return false;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return false;
    }
  }

  if (!email.includes('@')) {
   
      toast.error('Please enter a valid email address.');
      return false;
    
  } 


  return true;
};
