import { ControlPoint } from '@mui/icons-material';
import { Icon, TextField } from '@mui/material';
import IconButton from '@mui/material/Button';
import AddCardIcon from '@mui/icons-material/AddCard';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
type AddItemPropsType = {
    addItem: (NewTitle: string) => void
}

export function AddItemForm(props: AddItemPropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        let newTitle = title.trim()
        if (title.trim() !== "") {
            props.addItem(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addTask();
        }
    }
    return <div>
        <TextField
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            className={error ? "s.error" : ""}
            variant="standard"
            id="standard-basic"
            label="Standard"
            title='давай вводи текст'
            error={!!error}            //переводим в булевое значение
            helperText={error}
        />
        {/* <button onClick={addTask} >+</button> */}
        <IconButton onClick={addTask} color={'primary'} >
            <AddCardIcon fontSize='large'/>
            <Icon baseClassName="fas" className="fa-plus-circle" fontSize="small" />
        </IconButton>
        {/* {error && <div className="error-message">{error}</div>} 
    не нужен т.к. добавили helpetText   */}
    </div>
}