import { useRef, forwardRef } from "react";
import { useImperativeHandle } from "react";

const AddingTask = forwardRef(function AddingTask({}, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  return (
    <dialog ref={dialog}>
      <p>Modal</p>
    </dialog>
  );
});

export default AddingTask;
