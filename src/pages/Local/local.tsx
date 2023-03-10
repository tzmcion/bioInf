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
                <h4>Lokalne dopasowanie sekwencji jest to algorytm Smitha-Watermana por??wnuj??cy 2 sekwencjie nukleotydowe lub aminokwasowe ze sob??.
                    Por??wnanie to wykonujemy w celu znalezienia optymalnego dopasowania (align), kt??re da najwi??cej punkt??w, ale te?? ocenienia sensowno??ci tego dopasowania wizualnie.
                    Liczba punkt??w, czyli Total score, m??wi o tym jak du??a szansa jest na homologi?? dw??ch sekwencji, ale te?? mo??emy z niego wnioskowa??, ??e te sekwencje w danych miejscach
                    S?? podobne, a do czego tego u??yjemy to ju?? zale??y od bada?? :). Jednak opr??cz total score mamy wizualne przedstawienie w postaci kresek i literek. Mo??na na nie te?? 
                    spojrze?? w analizowaniu wyniku, gdy?? je??li np. Optymalne dopasowanie sekwencji nukelotydowej daj??ce du??o punkt??w koduje kompletnie inne aminokwasy (np. w ??rodku jest gap),
                    to Total score nie jest ju?? a?? tak pomocny.
                </h4>

                <h5>Dzia??anie algorytmu przedstawione jest krok po kroku tutaj. Jest ono troch?? bardziej skomplikowane ni?? macierze kropkowe (dot matrix), ale te?? z niego wychodz??
                    Wszystkie inne algorytmy i programy, np. Blast, Clastal, ca??e Multi sequence alignment itd...
                </h5>
                <h6>Wszystkie kroki mo??na zasymulowa?? dla swojej sekwencji u??ywaj??c programu obok...</h6>
                <ul>
                  <li>
                    <h5>Utworzenie macierzy, na g??rze algorytm wypisuje pierwsz?? por??wnywan?? sekwencji, na dole drug??. Kolumny obok s?? uzupe??niane zerami, reszta p??l 
                      aktualnie zostaje pusta
                    </h5>
                  </li>
                  <li>
                    <h5>Wype??nienie p??l macierzy. Je??li reszty, (literki) si?? zgadzaj??, to punktacja w danym polu matrycy r??wna jest "match score" podanemu przez u??ytkownika, je??li nie, nadawana jest warto???? "mismatch score".
                      Nast??pnie algorytm DODAJE do tej warto??ci warto???? maksymaln?? z jednego z 3 s??siednich p??l. Do wyboru jest pole "top", czyli na g??rze, "left", czyli po lewej, 
                      oraz "top-left", czyli lewy g??rny r??g. Je??li pole "top" lub "left" maj?? warto???? maksymaln??, to dodawana jest ona do punktacji pola razem z kar?? "gap penalty", podan?? 
                      przez u??ytkownika.  je??li pole z lewego g??rnego rogu "top-left" jest maksymaln?? warto??ci??, jest ono po prostu dodawane bez gap penalty. Jest tak dlatego, ??e tak jak w "dot matrix", je??li
                      sekwencja jest identyczna, to perfekcyjne u??o??enie b??dzie daiagonal??, czyli przek??tn?? wielok??ta. Dlatego "gap penalty" nie jewst dodawane w przypadku "top-left"
                    </h5>
                  </li>
                  <li>
                    <h5>
                      Nast??pnie algorytm zaczyna od prawego-dolnego rogu matrycy, i szuka najwi??kszej punktacji i takie pola wybiera, tworz??c "??cie??ke". 
                      z ka??dego pola "szuka" on maksymalnej warto??ci z p??l lewego,g??rnego i "top-left". Nast??pnie przesuwa si?? do tego pola z max value i 
                      tak w p??tli, a?? dojdzie do lewego-g??rnego rogu
                    </h5>
                  </li>
                  <li>
                    <h5>
                    Nast??pnie algorytm tworzy dopasowanie, a Total score, jest sum?? punkt??w ze ??cie??ki (r????owych p??l).
                    </h5>
                  </li>
                </ul>
                <h4 style={{color:'orange'}}>Zwr???? uwag?? jak istotne jest "gap penalty" w finalnym dopasowaniu. Zobacz np. pary "AATA" i "TAGC" dla gap penalty najpierw "-1", a potem "0".</h4>
                <h3>Dopasowanie Globalne</h3>
                <h5>Dopasowanie globalne jest bardzo podobnym algorytmem do dopasowania lokalnego. Nie ma tutaj na niego przedstawienia graficznego (nie chce mi si?? :), alinter_id
                  Jego g????wn?? r????nic?? jest, ??e na pocz??tku nie uzupe??nia on pierwszego wiersza i kolumny zerami, lecz daje tam od razu "gap penalty" odpowiednio coraz wi??ksze. Dlatego 
                  algorytm ten jest o wiele gorszy dla sekwencji o r????nych d??ugo??ciach.
                </h5>
                <h2>Kilka definicji:</h2>
                <ul>
                  <li>
                    <h4>Kara za Przerwy / Gap Penalty</h4>
                    <h5>Jest to w??a??nie gap penalty. Gdy w algorytmie ??cie??ka nie idzie po przek??tnej, lecz w lini wertykalnej lub horyzontalnej,
                      w dopasowaniu powstanie gap, czyli "-". Aby algorytm bra?? to pod uwag??, ??e nie jest to koniecznie korzystne, jest za to kara punktowa.
                      Dzi??ki temu algorytm ma jaki?? snens, bo w ewolucji unikamy gap??w...
                    </h5>
                  </li>
                  <li>
                    <h4>Kara za wyd????enie przerwy / Gap  Extension Penalty</h4>
                    <h5>Je??li 'gap' si?? powi??ksza, czyli w tworzeniu ??cie??ki jest linia wertykalna z wi??cej ni?? 2 kwadracik??w, to nie karamy punktowo tak samo,
                      lecz za przed??u??enie przerwy "--" , "---" , "---..." Jest mniej punkt??w karnych. Chodzi o to, ??e w ewolucji samo powsatanie przerwy jest bardziej
                      "crucial" ni?? to jak ona jest d??uga.
                    </h5>
                  </li>
                  <li>
                    <h4>Kara za Przerwy na ko??cach / End Gap Penalties</h4>
                    <h5>W programie needle mamy co?? takiego jak End gap penalties. W skr??cie, przydaja si?? one gdy sekwencje s?? r????nej d??ugo??ci, a co robi?? to jest do????
                      oczywiste po nazwie.
                    </h5>
                  </li>
                  <li>
                    <h4>Match score</h4>
                    <h5>Punkty dodawane do pola gdy literka jest taka sama</h5>
                  </li>
                  <li>
                    <h4>Mismatch score</h4>
                    <h5>Punkty odejmowane do pola gdy literki s?? r????ne.</h5>
                  </li>
                  <li>
                    <h4>Match i Mismatch w macierzach podstawie?? reszt aminokwasowych (Pam i Blosum)</h4>
                    <h5>Tam nie ma sta??ych punktacji. Dla ka??dej pary reszt s?? inne punkty, w??a??nie definiowane przez te macierze.</h5>
                  </li>
                </ul>
            </div>
        </div>
    </div>
  )
}
