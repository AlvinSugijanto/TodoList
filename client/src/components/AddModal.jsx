import React, { useState } from 'react'

const AddModal = ({ addModalRef, data, setData }) => {


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:4000/task", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any additional headers if needed
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    status: status
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const jsonData = await response.json();
            // console.log(jsonData.data);
            setData([...data, jsonData.data])
            resetField();
            addModalRef.current?.close();

        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    const resetField = () => {
        setTitle("");
        setDescription("");
        setStatus("");
    }
    return (
        <dialog id="my_modal_3" class="modal" ref={addModalRef}>
            <div class="modal-box">

                <button class="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
                    onClick={() => {
                        addModalRef.current?.close();
                    }}
                >✕</button>
                <h3 class="font-bold text-lg">Add New Task</h3>
                <div className='mt-4'>
                    <label >Title</label>
                    <input type="text" placeholder="Insert Title Here..." className="input input-bordered w-full my-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='mt-4'>
                    <label >Description</label>
                    <textarea className="textarea textarea-bordered w-full h-24 my-2" placeholder="Insert Description Here..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    >
                    </textarea>
                </div>
                <div className='mt-4'>
                    <label >Status</label>
                    <select className="select select-bordered w-full my-2 capitalize"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option hidden selected>--Select Category--</option>
                        <option value='todo'>To Do</option>
                        <option value='in_progress'>In Progress</option>
                        <option value='done'>Done</option>

                    </select>
                </div>

                <div className="flex justify-end">
                    <button className='px-3 py-1 border border-slate-400 bg-sky-500 text-white rounded-md mt-4'
                        onClick={handleSubmit}
                    >Submit</button>
                </div>
            </div>
        </dialog>
    )
}

export default AddModal