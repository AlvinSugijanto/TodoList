import React, { useEffect, useState } from 'react'

const UpdateModal = ({ updateModalRef, data, setData, selectedTask }) => {
    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");
    const [id, setId] = useState("");

    const [status, setStatus] = useState("");

    useEffect(() => {
        // setTitle(selectedTask?.title || '');
        // setDescription(selectedTask?.description || '');
        setId(selectedTask?.id);
        setStatus(selectedTask?.status || '');
    }, [selectedTask]);

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:4000/task/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any additional headers if needed
                },
                body: JSON.stringify({

                    status: status
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedTask = await response.json();
           
            
            setData((prevData) => {
                const updatedData = prevData.map((task) =>
                  task.id === updatedTask.data.id ? updatedTask.data : task
                );
                return updatedData;
              });
            resetField();
            updateModalRef.current?.close();

        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    const resetField = () => {
        setId("");
        setStatus("");
    }
    return (
        <dialog id="my_modal_3" class="modal" ref={updateModalRef}>
            <div class="modal-box">

                <button class="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
                    onClick={() => {
                        updateModalRef.current?.close();
                    }}
                >✕</button>
                <div className='mt-4'>
                    <label >Move To</label>
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

export default UpdateModal