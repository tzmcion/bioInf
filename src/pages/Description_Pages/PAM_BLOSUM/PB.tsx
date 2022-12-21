import React from 'react';
import Header from '../../Header/Header';
import Photo from '../../../utils/Photo';
import PB_photo from '../../../Assets/Pam_Blosum.jpg';
import BLOSUM62 from '../../../Assets/BLOSUM62.png';
import PAM250 from '../../../Assets/PAM250.png';
import './PB.css';

import {Link} from 'react-router-dom';

export default function PB() {
  return (
    <div className='PB'>
      <Header />
      <h4>Aby zwiększyć specyfikacje algorytmów sekwencjonujących "alignment algorithms" i nadać jakieś znaczenie ich statystykom/punktom z nich wynikającym, 
        konieczne było zaimplementowanie (wprowadzenie) znaczących schematów punktacji (szczególnie dla sekwencji aminokwasowych). Stąd powstały 2 główne
        macierze podstawień : PAM i BLOSUM.
      </h4>
      <ul>
        <li>
          <h3>Macierz PAM</h3>
          <p>Macierz PAM jest najstarszą macierzą podstawień. Powstała przez analizę grup białek (groups of proteins) z 85% podobieństwem. Każda komórka macierzy PAM
             (cell of matrix) odpowiada częstotliwości 100 reszt (pojedynczych literek...). Macierze PAM mają w nazwie jeszcze znaczącą liczbe, np. PAM1, PAM50, PAM250 
             Symbolicznie, liczba ta odpowiada milionom lat w ewolucji: PAM1 - najlepsza do porównywania sekwencji oddalonych o około milion lat w ewolucji, PAM250 - 250 milionów lat itd...
             Macierze różnych cyfr są po prostu mnożeniem macierzy PAM1 przez samą siebie daną ilość razy, PAM250 to macierz PAM1 przemnożona przez samą siebie 250 razy.j4</p>
          <Photo src={PAM250} description='Macierz PAM250, przykładowa. Jeśli poszukasz innych, to macierze o mniejszych numerach bedą inne...' className='PAM' />
        </li>
        <li>
          <h3>Macierz BLOSUM/</h3>
          <p>Macierz BLOSUM jest macierzą PAM, która została zaprojektowana do znajdywania podobieństwa w większych odległościach ewolucyjnych. Przy jej projektowaniu
            Brano sekwencje o mniejszych podobieństwach niż w macierzy PAM. Tak więc macierz BLOSUM sprawdza się lepiej w wyszukiwaniu podobieństw w mniejszych odległościach
            ewolucyjnych i lepiej się sprawdza w wyszukiwaniach lokalnych.
          </p>
          <Photo src={BLOSUM62} description='Macierz BLOSUM62' className='BLOSUM' />
        </li>
      </ul>
      <h3>BLAST vs PAM</h3>
      <div className='comparsion'>
        <div className='C1'>
          <h5>PAM</h5 > 
          <ul>
            <li>Sprawdza się wraz ze wzrostem różnicy między sekwencjami (większe odległości ewolucyjne)</li>
            <li>Dobre w wykrywaniu wysokich podobieństw ewolucyjnych</li>
            <li>Czym bliższe homologi sekwencje tym używamy niższej matrycy PAM PAM250, potem PAM100 itd.. w dół</li>
          </ul>
        </div>
        <div className="C1">
          <h5>BLOSUM</h5>
          <ul>
            <li>Wysokie zakresy podobieństwa (large ranges of similarity)</li>
            <li>Dobre w wykrywaniu podobieństw w większym dystansie ewolucyjnym</li>
            <li>Czym bliższe homologi sekwencyjny tym większy numer... BLOSUM62 potem BLOSUM80 potem BLOSUM90... w góre</li>
          </ul>
        </div>
      </div>
      <Photo src={PB_photo} description='Przykładowe sytuacje i odpowiednie macierze' className='Photo'/>
      <h4>Tworzenie macierzy podstawień przy użyciu BLOSUM i PAM</h4>
        <p>
          Macierze są tworzone bardzo podbnie jak te z sekwencji nukleinowych. Jednak w przypadku trafienia na inne białko, czyli porównanie
          2 różnych reszt aminokwasowych, podstawiane są punkty z danej macierzy. Może ich byc sporo, np. +14, lub przeciwnie, -11. Zależy to od tego, jaką szanse
          na bycie homologiem, lub na większe podobieństwo ma dana sekwencja przy takim dopasowaniu w porównaniu z innymi sekwencjami w ewolucji. Jeśli jeszcze nie wiesz,
          to najwyższy czas dowiedzieć się jak działają macierze podstawień i dopasowanie <Link to='/local'>lokalne</Link>.   
        </p>
    </div>
  )
}
