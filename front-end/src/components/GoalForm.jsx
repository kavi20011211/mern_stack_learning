import {useState} from 'react'
import {useDispatch} from 'react-redux';
import { setGoal } from '../features/goals/goalsSlice';
function GoalForm() {
    const [text,setText] = useState('');
    const dispatch = useDispatch();
    const onSubmit =(e)=>{
        e.preventDefault();
        const goalData ={text}
        dispatch(setGoal(goalData));
        setText('');
    }
  return (
    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label htmlFor='text'>Goal</label>
                <input type='text' name='text' id='text' value={text} onChange={(e)=>setText(e.target.value)}/>
            </div>
            <div className='form-group'>
                <button className='btn btn-block' type='submit'>Add Goal</button>
            </div>
        </form>
    </section>
  )
}

export default GoalForm