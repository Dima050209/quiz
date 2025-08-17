import { LoginForm } from "@/components/login-form";
import Modal from "@/components/modal";

export default async function LoginModal() {
  return (
    <Modal>
      <LoginForm />
    </Modal>
  );
}
