type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="flex flex-col items-center justify-center">
      {children}
    </div>
  );
}
