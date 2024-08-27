import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export function SideChat({opened}) {

    const staticClasses = 'fixed z-20 w-[400px] h-1/2 transition-all translate-y-2/4 rounded-md'
    const classes = opened ? staticClasses + ' translate-x-2' : staticClasses + ' -translate-x-full';


    const messages = [
        'hello how are u?',
        'fine',
        'how about you ?',
        'i am fine',
        'hello how are u?',
        'fine',
        'how about you ?',
        'i am fine',
        'hello how are u?',
        'fine',
        'how about you ?',
        'i am fine',
        'hello how are u?',
        'fine',
        'how about you ?',
        'i am fine',
        'hello how are u?',
        'fine',
        'how about you ?',
        'i am fine',
        'hello how are u?',
        'fine',
        'how about you ?',
        'i am fine',
        'hello how are u?',
        'fine',
        'how about you ?',
        'i am fine',
        'hello how are u?',
        'fine',
        'how about you ?',
        'i am fine',
        'hello how are u?',
        'fine',
        'how about you ?',
        'i am fine',
        'hello how are u?',
        'fine',
        'how about you ?',
        'i am fine',
        'hello how are u?',
        'fine',
        'how about you ?',
        'i am fine',
        'hello how are u?',
        'fine',
        'how about you ?',
        'i am fine',
        'hello how are u?',
        'fine',
        'how about you ?',
        'i am fine',
        'hello how are u?',
        'fine',
        'how about you ?',
        'i am fine',
        'hello how are u?',
        'fine',
        'how about you ?',
        'i am fine',
        'hello how are u?',
        'fine',
        'how about you ?',
        'i am fine',
        'hello how are u?',
        'fine',
        'how about you ?',
        'i am fine',
        'hello how are u?',
        'fine',
        'how about you ?',
        'i am fine',
    ]
    return (
        <>
            <div className={classes} style={{backgroundColor: 'rgba(94, 94, 94, 1)'}}>

                <div className="h-[90%] text-white border-1 rounded-ml mx-2 py-5">
                    <div className="h-full overflow-y-auto">
                        <ul className="mx-4">
                            {
                                messages.map((message, index) => {
                                    const evenOrodd = index % 2;
                                    const classes = evenOrodd ? 'text-end' : 'text-start';
                                    return <li key={index} className={classes}>User {index} {': '} {message}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="flex mx-2">
                <Input className='bg-white'></Input>
                <Button className='ml-2 font-mono'  >Send Message</Button>
                </div>
            </div>
        </>
    );
}