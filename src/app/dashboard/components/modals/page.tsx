"use client";

import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function ModalsPage() {
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  return (
    <div className="space-y-8">
      {/* مودال پایه */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
          مودال پایه
        </h2>
        <Button onClick={() => setOpen(true)}>باز کردن مودال</Button>

        <Modal show={open} onClose={() => setOpen(false)}>
          <ModalHeader>شرایط استفاده</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                این یک مودال نمونه است که برای نمایش محتوای مهم یا دریافت
                تأیید کاربر استفاده می‌شود.
              </p>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                می‌توانید محتوای دلخواه، فرم یا لیست رو داخل آن قرار دهید.
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setOpen(false)}>تأیید</Button>
            <Button color="gray" onClick={() => setOpen(false)}>
              انصراف
            </Button>
          </ModalFooter>
        </Modal>
      </section>

      {/* مودال تأیید */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
          مودال تأیید (Confirmation)
        </h2>
        <Button color="failure" onClick={() => setOpenConfirm(true)}>
          حذف مورد
        </Button>

        <Modal show={openConfirm} size="md" onClose={() => setOpenConfirm(false)} popup>
          <ModalHeader />
          <ModalBody>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                آیا مطمئن هستید که می‌خواهید این مورد را حذف کنید؟
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={() => setOpenConfirm(false)}>
                  بله، حذف کن
                </Button>
                <Button color="gray" onClick={() => setOpenConfirm(false)}>
                  انصراف
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </section>
    </div>
  );
}