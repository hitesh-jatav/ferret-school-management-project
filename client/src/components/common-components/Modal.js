import Reactm, { useState } from 'react'
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: "50%",
        // backgroundColor: "#f",
        padding: "0px",
        height: "auto",
        border: "1px solid lightgray"
        // padding
    },
};

export const ModalComponent = ({
    isOpen, setIsOpen, heading, children
}) => {
    return (
        <div>
            <Modal
                isOpen={isOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
                shouldCloseOnOverlayClick={false}
            >

                <div className='w-100' >
                    {/* header section */}
                    <div className='d-flex justify-content-between align-items-center mb-3'
                        style={{
                            'color': '#181F3A',
                            'fontWeight': '700',
                            'padding': '10px',
                            'borderBottom': "1px solid gray"
                        }}>
                        <span className='bold'>{heading}</span>
                        <i className="ri-close-line cursor-pointer " onClick={() => setIsOpen(false)}></i>
                    </div>

                    <div className='' style={{ 'padding': '10px' }}>{children} </div>

                </div>
            </Modal>
        </div>
    )
}


export const ConfirmBox = ({ isOpen, setIsOpen, heading, message, confirmFnc }) => {

    return (
        <div>
            <Modal
                isOpen={isOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
                shouldCloseOnOverlayClick={false}
            >

                <div className='w-100' style={{}}>
                    <div className='d-flex justify-content-between align-items-center mb-3'>
                        <span className='bold'>{heading || 'Confirmation'}</span>
                        <button className='d-block border-none' onClick={() => setIsOpen(false)}>
                            <i className='uil uil-times pointer-cursor'></i>
                        </button>
                    </div>


                    <span>{message || 'Are you sure, you want to continue?'}</span>


                    {/* footer */}
                    <div className='d-flex justify-content-between'>
                        <h6>{" "}</h6>
                        <div className='mt-2'>
                            <button className='mx-2 border-none btn btn-secondary' onClick={() => setIsOpen(false)}>No</button>
                            <button type='button' className='border-none btn btn-success' onClick={() => {
                                confirmFnc();
                                setIsOpen(false);
                            }}>Yes</button>
                        </div>
                    </div>


                </div>

            </Modal>
        </div>
    )

}

// export default ModalComponent