// src/components/molecules/InputField/index.d.ts
import * as React from 'react';

export interface InputFieldProps {
  label: string;
  placeholder: string;
  isLocked?: boolean;
  value: string;
  // PERUBAHAN KRITIS: Tambahkan tanda tanya (?) agar menjadi opsional
  onChangeText?: (text: string) => void;
}

declare const InputField: React.FC<InputFieldProps>;

export default InputField;
