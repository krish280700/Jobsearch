import Label from './Base/label'
import Input from './Base/input'
import Errormsg from './Base/errMsg'

export default function Formgroup({form, error, from, ...props}){
    return (
        <div className={`mb-3 form-group`}>
            {
                form.formType.includes(from) ? <>
                    <Label form={form}/>
                    <Input form={form} state={props.state} control={props.control} register={props.register}/>
                    <Errormsg err={error} form={form} />
                </>
                 :
                ''
            }
        </div>
    )
}