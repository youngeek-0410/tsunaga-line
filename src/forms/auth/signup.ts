import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export type SignupArgs = {
  username: string;
  email: string;
  password: string;
  verificationPassword: string;
};

export type SignupUsernameArgs = Pick<SignupArgs, 'username'>;
export type SignupEmailArgs = Pick<SignupArgs, 'email'>;
export type SignupPasswordArgs = Pick<SignupArgs, 'password' | 'verificationPassword'>;

export const signupFormUsernameSchema = yup
  .object()
  .required()
  .shape({
    username: yup
      .string()
      .required('入力は必須です')
      .matches(
        /^[a-zA-Z](?:[a-zA-Z0-9_-]*[a-zA-Z0-9])?(?:\.(?:[a-zA-Z0-9_-]*[a-zA-Z0-9])?)*$/,
        '英数字 . - _で入力してください',
      )
      .min(3, '3文字以上入力してください')
      .max(20, '20文字以下で入力してください'),
  });

export const signupFormEmailSchema = yup
  .object()
  .required()
  .shape({
    email: yup.string().required('入力は必須です').email('メールアドレスの形式が不正です'),
  });

export const signupFormPasswordSchema = yup
  .object()
  .required()
  .shape({
    password: yup
      .string()
      .required('入力は必須です')
      .matches(/^(?=.*?[a-z])(?=.*?\d)/, ' パスワードは半角英数字を組み合わせて入力してください'),
    verificationPassword: yup
      .string()
      .required('入力必須です')
      .oneOf([yup.ref('password')], 'パスワードが一致しません'),
  });

export const useSignupUsernameForm = () => {
  return useForm<SignupUsernameArgs>({
    resolver: yupResolver(signupFormUsernameSchema),
    mode: 'onChange',
  });
};

export const useSignupEmailForm = () => {
  return useForm<SignupEmailArgs>({
    resolver: yupResolver(signupFormEmailSchema),
    mode: 'onChange',
  });
};

export const useSignupPasswordForm = () => {
  return useForm<SignupPasswordArgs>({
    resolver: yupResolver(signupFormPasswordSchema),
    mode: 'onChange',
  });
};
