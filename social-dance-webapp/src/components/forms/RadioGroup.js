export default function RadioGroup({title, startValue, radioButtons, setValue}) {
    return (
        <div>
            <label className="text-sm font-medium leading-6 text-gray-900">{title}</label>
            {/*<p className="text-sm text-gray-500">How do you prefer to receive notifications?</p>*/}
            <fieldset className="mt-2">
                <legend className="sr-only">Notification method</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                    {radioButtons.map((button) => (
                        <div key={button.id} className="flex items-center">
                            <input
                                id={button.id}
                                name="notification-method"
                                type="radio"
                                defaultChecked={button.id === startValue}
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                value={button.title}
                                onClick={event => setValue(event.target.value)}
                            />
                            <label htmlFor={button.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                {button.title}
                            </label>
                        </div>
                    ))}
                </div>
            </fieldset>
        </div>
    )
}