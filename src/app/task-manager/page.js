import { CustomKanban } from '@/components/TaskKabanBoard/CustomKanban'
import React from 'react'
import { getSession } from '../actions/authActions'
import { getTasksByUserId } from '../actions/taskActions'

async function page() {    const session = await getSession()
    const { data } = await getTasksByUserId(session._id)
    return (
        <div><CustomKanban userId={session._id}  /></div>

    )
}

export default page