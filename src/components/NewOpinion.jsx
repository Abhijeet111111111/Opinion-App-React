import {use, useActionState} from 'react'
import {OpinionsContext} from '../store/opinions-context.jsx'
import SubmitFormStatus from "./SubmitFormStatus.jsx";

export function NewOpinion() {
    const {addOpinion} = use(OpinionsContext)
    const [state,formAction] = useActionState(handleFormAction,{error : null})
    async function handleFormAction(prevState,formData){

        const userName = formData.get('userName');
        const title = formData.get('title');
        const body = formData.get('body');
        let error = [];
        if(userName.length < 3){
            error.push('username should have at least 3 characters');
        }
        if(!title.length){
            error.push("title can't be empty");
        }
        if(body.length < 3){
            error.push("please Add your opinion");
        }

        if(error.length){
            return {error,
                enteredValues:{
                    userName,
                    title,
                    body
                }
            }
        }

        await addOpinion({title , userName, body})
        return {error : null}
    }
  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={state.enteredValues?.userName} />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={state.enteredValues?.title} />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={state.enteredValues?.body}></textarea>
        </p>

        <SubmitFormStatus />
      </form>
        <ul className="errors">{ state.error && state.error.map((err,i) => <li key={err}>{err}</li>)}</ul>
    </div>
  );
}
