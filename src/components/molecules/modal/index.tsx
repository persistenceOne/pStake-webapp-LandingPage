import React, { useRef } from "react";
import {emptyFunc} from "../../../helpers/utils";
import {useOnClickOutside} from "../../../customHooks/useOnClickOutside";

type AnimateTypes = "fadeIn" | "slideDown"

export interface ModalProps{
    header?: React.ReactNode | string;
    onClose?: () => void;
    children: React.ReactNode;
    closeButton?: any;
    show: boolean;
    className?: string;
    staticBackDrop?: boolean;
    footer?: React.ReactNode | string;
    animate? : AnimateTypes | null,
    modalDialogClassName?: string,
    modalHeaderClassName?:string
    modalBodyClassName?: string,
}

export const Modal = ({
                          children,
                          show,
                          header,
                          onClose = emptyFunc,
                          className,
                          staticBackDrop = true,
                          closeButton = null,
                          footer,
                          animate = null,
                          modalDialogClassName = "",
                          modalHeaderClassName = "",
                          modalBodyClassName = ""
                      }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(modalRef, onClose);

    return show ? (
        <div>
            <div
                className={`${
                    show ? "open" : "close"
                } ${
                    animate !== null ? "backDrop" : ""
                } bg-[#00000099] backdrop-blur-sm fixed top-0 right-0 z-10 left-0 w-full h-full`}
            />
            <div
                className={
                    `${
                        show ? "open" : "close"
                    } ${
                        animate !== null ? animate : ""
                    } animate modal fade2 fixed top-0 right-0 left-0 w-full h-full z-20 overflow-auto ` + ` ${className}`
                }
            >
                <div
                    className={`${modalDialogClassName} max-w-[500px] flex items-center min-h-full w-auto m-auto relative modalDialog`}
                >
                    <div
                        className={`bg-black-500 relative flex flex-col w-full rounded-lg text-white-300 modalContent`}
                        ref={staticBackDrop ? null : modalRef}
                    >
                        {closeButton !==null ? (
                            <button
                                type="button"
                                onClick={onClose}
                                className={`buttonClose`}
                            >
                                {closeButton}
                            </button>
                        ) : null}
                        {header ? (
                            <div
                                className={`modalHeader text-2xl text-white-100 font-semibold
                  flex justify-between md:text-lg items-start px-8 pt-8 md:px-6 md:pt-6 rounded-t dark:border-gray-600 ${modalHeaderClassName}`}
                            >
                                {header}
                            </div>
                        ) : (
                            ""
                        )}
                        <div className={`modalBody p-8 md:p-6 ${modalBodyClassName}`}>{children}</div>
                        {footer ? (
                            <div
                                className="text-2xl text-white-100 font-semibold
                  flex justify-between md:text-lg items-start px-8 pb-8 md:px-6 md:pt-6 rounded-t dark:border-gray-600 modalFooter"
                            >
                                <p>{footer}</p>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};
