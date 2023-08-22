import { surpriseMePrompts } from '../constants';
import FileSaver from 'file-saver';

export function getRandomPrompt(prompts) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);

    const randomPrompt= surpriseMePrompts[randomIndex];


    if (randomPrompt===prompts){
        return getRandomPrompt(prompts)
    }

    return randomPrompt
}


export const downloadImage = async (_id,photo) =>{
    FileSaver.saveAs(photo,`download-${_id}.jpg`);
}
