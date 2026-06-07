import type { ReactElement } from 'react';

type AuthNoticeProps = {
  message: string;
  tone: 'error' | 'info' | 'success';
};

const toneClasses: Record<AuthNoticeProps['tone'], string> = {
  error: 'border-red-200 bg-red-50 text-red-700',
  info: 'border-[#4A2518]/20 bg-[#F4F2F0] text-[#4A2518]',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
};

const AuthNotice = ({ message, tone }: AuthNoticeProps): ReactElement => {
  return (
    <div className={`border px-4 py-3 text-sm font-medium ${toneClasses[tone]}`}>
      {message}
    </div>
  );
};

export default AuthNotice;
