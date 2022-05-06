import { TextField } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'

type EditableSpanType = {
    title: string
    onChange: (newValue: string) => void
}


export const EditableSpan = (props: EditableSpanType) => {
    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState('')

    const activateEditeMode = () => {
        setEditMode(true)
        setNewTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(newTitle)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)

    return editMode
        ? <TextField
            variant="standard"
            value={newTitle}
            onChange={onChangeTitleHandler}
            onBlur={activateViewMode}
            autoFocus />
        : <span onDoubleClick={activateEditeMode}>✎{props.title}</span>
}