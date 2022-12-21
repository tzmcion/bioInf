import React, { ReactElement,useState,useEffect, useRef } from 'react';
import './Emulator.css';

interface emulatorProps{
    first_sequence:Array<string>
    second_sequence:Array<string>,
    gap:number,
    match:number,
    mismatch:number
}

interface Field_BS{
    width:number,
    height:number,
    x:number,
    y:number,
    value:any,
    bg_color:string
}

export default function Emulator({first_sequence,second_sequence,gap,match,mismatch}:emulatorProps):ReactElement {

    const [fields,setFeilds] = useState<Array<Array<Field_BS>>>();
    const [anylyzed,setAnylyzed] = useState<{y:number,x:number}>({x:1,y:1});
    const [timer,setTimer] = useState<number>(0);
    const inter_id = useRef<any>(null);
    const [altimer,setAltimer] = useState<number>(0);
    const alinter_id = useRef<any>(null);
    const [searchField,setSearchField] = useState<{x:number,y:number}>({x:-1,y:-1});
    const [steps,setSteps] = useState<Array<string>>([]);
    const [alignment,setAlignment] = useState<[string ,string]>();
    const finish = useRef<boolean>(false);

    const createTable = () =>{
        const newTable = new Array<Array<Field_BS>>;
        const width = 35;
        const height = 35;
        for(let y = 0; y < second_sequence.length + 2; y++){
            const row = new Array<Field_BS>;
            for(let x = 0; x < first_sequence.length + 2; x++){
                let x_pos = x*width;
                let y_pos = y*width;
                let value = ''
                if(y === 0 && x === 0){
                    value = 'none';
                }
                else if(y === 0){
                    if(first_sequence[x-1]){
                        value = first_sequence[x -1];
                    }else{
                        value = 'none';
                    }
                    x_pos = (x+1)*width;
                }
                else if(x === 0){
                    if(second_sequence[y-1]){
                        value = second_sequence[y-1]
                    }else{
                        value = 'none';
                    }
                    y_pos = (y+1)*width;
                }
                else{
                    value = '?';
                }
                row.push({width:width,height:height,x:x_pos,y:y_pos,value:value,bg_color:'white'});
                
            }
            newTable.push(row);
        }
        setFeilds(newTable);
    }

    const step1 = () =>{
        if(fields){
            const table = [...fields];
            console.log('h1')
            table.map((col,col_index) =>{
                col.map((row,row_index) =>{
                    if(row_index === 1 && col_index !== 0){
                        row.value = 0;
                        row.bg_color = 'gray';
                    }
                    if(col_index === 1 && row_index !== 0){
                        row.value = 0;
                        row.bg_color = 'gray';
                    }
                })
            })
        setFeilds(table)
        renderTable();
    }
    }

    const next_steps = () =>{
        const gap_penalty = gap;
        const match_score = match;
        
        if(fields && anylyzed.y !== -1){
            const table = [...fields];
            table.map(f => f.map(el => el.bg_color !== 'gray' ? el.bg_color = 'white' : null));
            const max_anylyzed = second_sequence.length - 1;
            let field_value = 0;
            //First, check if it is the same R
            const first_r = table[0][anylyzed.x].value;
            const second_r = table[anylyzed.y][0].value;
            console.log(first_r + ' ' + second_r);
            field_value = first_r === second_r ? match_score : mismatch;
            //Next, get the values from neighbour fields
            const top_value = table[anylyzed.y][anylyzed.x + 1].value;
            const left_value = table[anylyzed.y + 1][anylyzed.x].value;
            const top_left_value = table[anylyzed.y][anylyzed.x].value;
            if(anylyzed.y !== 1)
            table[anylyzed.y][anylyzed.x + 1].bg_color = 'blue';
            if(anylyzed.x !== 1)
            table[anylyzed.y + 1][anylyzed.x].bg_color = 'blue';
            if(anylyzed.y !== 1 && anylyzed.x !== 1)
            table[anylyzed.y][anylyzed.x].bg_color = 'blue';
            if(top_value === left_value === top_left_value || field_value === 1){
                if(field_value === 0){
                    field_value += top_left_value + mismatch
                }else{
                    field_value += top_left_value;
                }
            }
            else if(top_left_value >= top_value && top_left_value >= left_value){
                if(field_value === 0){
                    field_value += top_left_value + mismatch
                }else{
                field_value += top_left_value;
                }
            }
            else if(top_value >= top_left_value && top_value >= left_value){
                field_value += top_value + gap_penalty;
            }
            else if(left_value >= top_left_value && left_value >= top_value){
                field_value += left_value + gap_penalty;
            }
            let newAnylyzed = {x:anylyzed.x,y:anylyzed.y};
            newAnylyzed.x +=1;
            if(newAnylyzed.x > first_sequence.length){
                newAnylyzed.y +=1;
                newAnylyzed.x = 1;
            }
            if(newAnylyzed.y > second_sequence.length){
                newAnylyzed.y = -1;
                table.map(f => f.map(el => el.bg_color !== 'gray' ? el.bg_color = 'white' : null));
            }
            table[anylyzed.y + 1][anylyzed.x + 1].value = field_value;
            setAnylyzed(newAnylyzed);
            setFeilds(table);
        }
    }

    const renderTable = () =>{
        return fields?.map(field =>
            field.map((f,index) =>{
                if(f.value !== 'none'){
                    return <div className='Field' key={index} style={{width:f.width, height:f.height, left:f.x, top:f.y, backgroundColor:f.bg_color}}><p>{f.value}</p></div> 
                }
                return <></>
            })
        )
    }

    useEffect(()=>{
        createTable();
    },[])

    const run = () =>{
            if(inter_id.current){
                clearInterval(inter_id.current)
                inter_id.current = null;
            }else
            inter_id.current = setInterval(()=>{
                setTimer(t => t + 1);
            },20)
    }

    const run_align = () =>{
        if(alinter_id.current){
            clearInterval(alinter_id.current);
            alinter_id.current = null;
        }else{
            alinter_id.current = setInterval(()=>{
                setAltimer(t => t + 1);
            },100)
        }
    }

    const last_step = () =>{
        if(finish.current === false)
        if(fields && anylyzed.y === -1){
            if(searchField.x !== 1 || searchField.y !== 1){
            let newField = {x:searchField.x,y:searchField.y};
            let thisSteps = [...steps];
            const table = [...fields];
            if(searchField.x === -1){
                newField.x = first_sequence.length + 1;
                newField.y = second_sequence.length + 1;
                table[newField.y][newField.x].bg_color = 'violet';
                setFeilds(table);
                setSearchField(newField);
            }else{
                let left_value = -1;
                const top_value = table[searchField.y - 1][searchField.x].value;
                if(table[searchField.y][searchField.x - 1])
                left_value = table[searchField.y][searchField.x - 1].value;
                const top_left_value = table[searchField.y -1][searchField.x -1].value;
                if(top_left_value === 0 &&  typeof top_left_value === 'number'){
                    newField.x -=1;
                    newField.y -=1;
                    thisSteps.push('top-left');
                }
                else if(top_left_value >= top_value && top_left_value >= left_value &&  typeof top_left_value === 'number'){
                    newField.x -=1;
                    newField.y -=1;
                    thisSteps.push('top-left');
                }
                else if(top_value >= top_left_value && top_value >= left_value && typeof top_value === 'number' || (typeof left_value !== 'number' && typeof top_left_value !== 'number')){
                    newField.y -=1;
                    thisSteps.push('top');
                }
                else if(left_value >= top_left_value && left_value >= top_value &&  typeof left_value === 'number' || (typeof top_value !== 'number' && typeof top_left_value !== 'number')){
                    newField.x -=1;
                    thisSteps.push('left');
                }else{
                    finish.current = true;
                }
                table[newField.y][newField.x].bg_color = 'violet';
                setFeilds(table);
                setSteps(thisSteps);
                setSearchField(newField);
            }
            }
        }
    }

    const create_alignment = () =>{
        let first_index = 0;
        let second_index = 0;
        let first_string = '';
        let second_string = '';
        const thisSteps = [...steps].reverse();
        for(let x = 0; x < steps.length; x++){
            if(thisSteps[x] === 'left'){
                first_string += first_sequence[first_index];
                first_index ++;
                second_string += '-';
            }
            if(thisSteps[x] === 'top'){
                second_string += second_sequence[second_index];
                second_index ++;
                first_string += '-';
            }
            if(thisSteps[x] === 'top-left'){
                second_string += second_sequence[second_index];
                second_index ++;
                first_string += first_sequence[first_index];
                first_index ++;
            }
        }
        console.log(first_string);
        console.log(second_string);
        setAlignment([first_string, second_string]);
    }

    useEffect(()=>{
        next_steps();
        if(anylyzed.y === -1){
            clearInterval(inter_id.current);
        }
    },[timer])

    useEffect(()=>{
        last_step();
        if(finish.current){
            clearInterval(alinter_id.current);
        }
    },[altimer])

  return (
    <div className='Emulator'>
        <button onClick={step1} >Prepare Table</button>
        <button onClick={run}>Next Step</button>
        <button onClick={next_steps}>Next Step By Step</button>
        <button onClick={run_align}>Last_Steps</button>
        <button onClick={last_step}>Last Steps step by step</button>
        <button onClick={create_alignment}>Align</button>
        <div className="Table">
            {renderTable()}
        </div>
        {alignment && <div className='alignment'><p>{alignment[0]}</p><p>{alignment[1]}</p></div>}
    </div>
  )
}
