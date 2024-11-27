import { useState } from 'react';
import RandomBoxModal from '@/components/Common/RandomBox/RandomBoxModal';

export default function TestPage() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <h1>테스트 페이지</h1>
      {isOpen && <RandomBoxModal onClose={handleClose} />}
    </div>
  );
}