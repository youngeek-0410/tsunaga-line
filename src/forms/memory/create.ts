import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export type CreateMemoryArgs = {
  caption: string;
  timeLabel: string;
  description: string;
};

export const createMemorySchema = yup.object().shape({
  caption: yup.string().required('入力は必須です'),
  timeLabel: yup.string().required('入力は必須です'),
  description: yup.string().default(''),
});

export const useCreateMemoryForm = () => {
  return useForm<CreateMemoryArgs>({
    resolver: yupResolver(createMemorySchema),
    mode: 'onChange',
  });
};
