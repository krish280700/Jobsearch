import Mandatoryfield from './mandatoryFields'

export default function Label({form}){
    const {label, name} = form
    return <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor={name}>{label} {form.isRequired ? <Mandatoryfield /> : ''}</label>
}