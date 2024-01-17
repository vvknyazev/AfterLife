import React, {useState} from 'react';
import s from './SessionInviteModal.module.css'

const SessionInviteModal = ({open, closeModal}) => {
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const [selectedOption, setSelectedOption] = useState('option1');
    const toggleDropdown = () => {
        setIsOpenDropdown(!isOpenDropdown);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    if (!open) return null
    return (
        <div className={s.overlay}>
            <div className={s.modalContainer}>
                <div className={s.closeButton} onClick={closeModal}>
                    <img src="/session-invite-modal/close.svg" alt="close"/>
                </div>
                <div className={s.search}>
                    <div className={s.searchIcon}>
                        <img src="/session-invite-modal/search.svg" alt="search"/>
                    </div>
                    <input type="text" placeholder='Введите имя для поиска'/>
                </div>

                <div className={s.dropdownContainer}>
                        <button onClick={toggleDropdown}><img src="/session-invite-modal/gate-buffer.svg" alt="btn"/>Пригласить
                            по имени
                        </button>

                        <div
                            className={`${s.dropdownList} ${isOpenDropdown ? s.dropdownListOpen : s.dropdownListClose}`}>
                            <label>
                                <input
                                    type={"radio"}
                                    value={"option1"}
                                    checked={selectedOption === 'option1'}
                                    onChange={handleOptionChange}
                                />
                                User nickname
                            </label>
                            <label>
                                <input
                                    type={"radio"}
                                    value={"option2"}
                                    checked={selectedOption === 'option2'}
                                    onChange={handleOptionChange}
                                />
                                User nickname
                            </label>
                            <label>
                                <input
                                    type={"radio"}
                                    value={"option3"}
                                    checked={selectedOption === 'option3'}
                                    onChange={handleOptionChange}
                                />
                                User nickname
                            </label>

                        </div>
                    </div>

                <div className={s.sendInvite}>
                    <button>Отправить приглашение</button>
                </div>
            </div>
        </div>
    );
};

export default SessionInviteModal;