import { Button,  Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';


interface Props {
    modalHeader : string 
    modalBody : string 
    onAccept : () => void
    isOpen : boolean
    setIsOpenModal : (status : boolean) => void
}

export const CustomModal = ({isOpen, modalBody, modalHeader,  onAccept, setIsOpenModal} : Props) => {


    return (
        <Modal isOpen = {isOpen}>
            <ModalHeader  className="bg-dark">
                <h2>{modalHeader}</h2>
            </ModalHeader>
            <ModalBody className="bg-dark">
                <h6>{modalBody}</h6>
            </ModalBody>
            <ModalFooter className="bg-dark p-4">
                <Button
                    color="primary"
                    onClick = {() => {
                        onAccept()
                        setIsOpenModal(false)
                    }}
                >
                    Accept
                </Button>
                {' '}
                <Button onClick={() => {
                    setIsOpenModal(false)
                }}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}
