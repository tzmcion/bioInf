import React, { useState } from 'react';
import './local.css';
import Emulator from '../../utils/Matrix_Emulator/Emulator';
import Header from '../Header/Header';

const table_from_string = (str:string) =>{
  const tab = [];
  for(let x = 0; x < str.length; x++){
    tab.push(str[x]);
  }
  return tab;
}

export default function Local() {

  const [first,setFirst] = useState<string>('');
  const [second,setSecond] = useState<string>('');
  const [gap,setGap] = useState<number>(-1);
  const [match,setMatch] = useState<number>(1);
  const [mismatch,setMismatch] = useState<number>(0);
  const [start,setStart] = useState<boolean>(false);

  const run = () =>{
    if(start){
      setStart(false);
      setTimeout(()=>{setStart(true)},200);
    }
    else{
      setStart(true);
    }
  }


  return (
    <div className='Local'>
        <Header />
        <div className='c50'>
            {start && <Emulator first_sequence={table_from_string(first)} second_sequence={table_from_string(second)} match={match} mismatch={mismatch} gap={gap > 0 ? gap*-1 : gap} />}
        </div>
        <div className='c50 inputs'>
            <label>Input first sequence</label>
            <input type='text' onChange={(e) =>{setFirst(e.target.value)}} value={first} />
            <label>Input second sequence</label>
            <input type='text' onChange={(e) =>{setSecond(e.target.value)}} value={second}/>
            <label>Set Gap gap is always -, 1 = -1 ...</label>
            <input type='number' onChange={(e) =>{setGap(parseInt(e.target.value))}} value={gap}/>
            <label>Set match value</label>
            <input type='number' onChange={(e) =>{setMatch(parseInt(e.target.value))}} value={match}/>
            <label>Set mismatch value</label>
            <input type='number' onChange={(e) =>{setMismatch(parseInt(e.target.value))}} value={mismatch}/>
            <button onClick={run} >Start Aligning...</button>
            <div className='instruction'>
                <h4>Lokalne dopasowanie sekwencji jest to algorytm Smitha-Watermana porównujący 2 sekwencjie nukleotydowe lub aminokwasowe ze sobą.
                    Porównanie to wykonujemy w celu znalezienia optymalnego dopasowania (align), które da najwięcej punktów, ale też ocenienia sensowności tego dopasowania wizualnie.
                    Liczba punktów, czyli Total score, mówi o tym jak duża szansa jest na homologię dwóch sekwencji, ale też możemy z niego wnioskować, że te sekwencje w danych miejscach
                    Są podobne, a do czego tego użyjemy to już zależy od badań :). Jednak oprócz total score mamy wizualne przedstawienie w postaci kresek i literek. Można na nie też 
                    spojrzeć w analizowaniu wyniku, gdyż jeśli np. Optymalne dopasowanie sekwencji nukelotydowej dające dużo punktów koduje kompletnie inne aminokwasy (np. w środku jest gap),
                    to Total score nie jest już aż tak pomocny.
                </h4>

                <h5>Działanie algorytmu przedstawione jest krok po kroku tutaj. Jest ono trochę bardziej skomplikowane niż macierze kropkowe (dot matrix), ale też z niego wychodzą
                    Wszystkie inne algorytmy i programy, np. Blast, Clastal, całe Multi sequence alignment itd...
                </h5>
                <h6>Wszystkie kroki można zasymulować dla swojej sekwencji używając programu obok...</h6>
                <ul>
                  <li>
                    <h5>Utworzenie macierzy, na górze algorytm wypisuje pierwszą porównywaną sekwencji, na dole drugą. Kolumny obok są uzupełniane zerami, reszta pól 
                      aktualnie zostaje pusta
                    </h5>
                  </li>
                  <li>
                    <h5>Wypełnienie pól macierzy. Jeśli reszty, (literki) się zgadzają, to punktacja w danym polu matrycy równa jest "match score" podanemu przez użytkownika, jeśli nie, nadawana jest wartość "mismatch score".
                      Następnie algorytm DODAJE do tej wartości wartość maksymalną z jednego z 3 sąsiednich pól. Do wyboru jest pole "top", czyli na górze, "left", czyli po lewej, 
                      oraz "top-left", czyli lewy górny róg. Jeśli pole "top" lub "left" mają wartość maksymalną, to dodawana jest ona do punktacji pola razem z karą "gap penalty", podaną 
                      przez użytkownika.  jeśli pole z lewego górnego rogu "top-left" jest maksymalną wartością, jest ono po prostu dodawane bez gap penalty. Jest tak dlatego, że tak jak w "dot matrix", jeśli
                      sekwencja jest identyczna, to perfekcyjne ułożenie będzie daiagonalą, czyli przekątną wielokąta. Dlatego "gap penalty" nie jewst dodawane w przypadku "top-left"
                    </h5>
                  </li>
                  <li>
                    <h5>
                      Następnie algorytm zaczyna od prawego-dolnego rogu matrycy, i szuka największej punktacji i takie pola wybiera, tworząc "ścieżke". 
                      z każdego pola "szuka" on maksymalnej wartości z pól lewego,górnego i "top-left". Następnie przesuwa się do tego pola z max value i 
                      tak w pętli, aż dojdzie do lewego-górnego rogu
                    </h5>
                  </li>
                  <li>
                    <h5>
                    Następnie algorytm tworzy dopasowanie, a Total score, jest sumą punktów ze ścieżki (różowych pól).
                    </h5>
                  </li>
                </ul>
                <h4 style={{color:'orange'}}>Zwróć uwagę jak istotne jest "gap penalty" w finalnym dopasowaniu. Zobacz np. pary "AATA" i "TAGC" dla gap penalty najpierw "-1", a potem "0".</h4>
                <h3>Dopasowanie Globalne</h3>
                <h5>Dopasowanie globalne jest bardzo podobnym algorytmem do dopasowania lokalnego. Nie ma tutaj na niego przedstawienia graficznego (nie chce mi się :), alinter_id
                  Jego główną różnicą jest, że na początku nie uzupełnia on pierwszego wiersza i kolumny zerami, lecz daje tam od razu "gap penalty" odpowiednio coraz większe. Dlatego 
                  algorytm ten jest o wiele gorszy dla sekwencji o różnych długościach.
                </h5>
                <h2>Kilka definicji:</h2>
                <ul>
                  <li>
                    <h4>Kara za Przerwy / Gap Penalty</h4>
                    <h5>Jest to właśnie gap penalty. Gdy w algorytmie ścieżka nie idzie po przekątnej, lecz w lini wertykalnej lub horyzontalnej,
                      w dopasowaniu powstanie gap, czyli "-". Aby algorytm brał to pod uwagę, że nie jest to koniecznie korzystne, jest za to kara punktowa.
                      Dzięki temu algorytm ma jakiś snens, bo w ewolucji unikamy gapów...
                    </h5>
                  </li>
                  <li>
                    <h4>Kara za wydłżenie przerwy / Gap  Extension Penalty</h4>
                    <h5>Jeśli 'gap' się powiększa, czyli w tworzeniu ścieżki jest linia wertykalna z więcej niż 2 kwadracików, to nie karamy punktowo tak samo,
                      lecz za przedłużenie przerwy "--" , "---" , "---..." Jest mniej punktów karnych. Chodzi o to, że w ewolucji samo powsatanie przerwy jest bardziej
                      "crucial" niż to jak ona jest długa.
                    </h5>
                  </li>
                  <li>
                    <h4>Kara za Przerwy na końcach / End Gap Penalties</h4>
                    <h5>W programie needle mamy coś takiego jak End gap penalties. W skrócie, przydaja się one gdy sekwencje są różnej długości, a co robią to jest dość
                      oczywiste po nazwie.
                    </h5>
                  </li>
                  <li>
                    <h4>Match score</h4>
                    <h5>Punkty dodawane do pola gdy literka jest taka sama</h5>
                  </li>
                  <li>
                    <h4>Mismatch score</h4>
                    <h5>Punkty odejmowane do pola gdy literki są różne.</h5>
                  </li>
                  <li>
                    <h4>Match i Mismatch w macierzach podstawień reszt aminokwasowych (Pam i Blosum)</h4>
                    <h5>Tam nie ma stałych punktacji. Dla każdej pary reszt są inne punkty, właśnie definiowane przez te macierze.</h5>
                  </li>
                </ul>
            </div>
        </div>
    </div>
  )
}
