type UserInfo = {
  email: string;
  password: string;
};

const validateUser = (values: UserInfo) => {
  const errors = {
    email: '',
    password: '',
  };

  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }

  if (!(values.password.length >= 8 && values.password.length < 20)) {
    errors.password = '비밀번호를 8~20자 사이로 입력해주세요.';
  }

  return errors;
};

/** 로그인 유효성 검사 */
const validateLogin = (values: UserInfo) => {
  const errors = validateUser(values);

  return errors;
};

/** 회원가입 유효성 검사 */
const validateSignup = (values: UserInfo & {passwordConfirm: string}) => {
  const errors = validateUser(values);
  const signupErrors = {...errors, passwordConfirm: ''};

  if (values.password !== values.passwordConfirm) {
    signupErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
  }

  return signupErrors;
};

export {validateLogin, validateSignup};
