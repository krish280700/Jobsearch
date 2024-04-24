export default function errorMsg({err, form}){
    return <span id={`${form.name}_err`} className="mt-2 text-xs text-red-600 dark:text-red-400">{err[form.name] ? err[form.name].message : ''}</span>
}