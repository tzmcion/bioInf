import React from 'react'
import Header from '../Header/Header';
import {Link} from 'react-router-dom'
import Photo from '../../utils/Photo';
import './Blast.css';

import BLAST_one from '../../Assets/BLAST1.png';
import BLAST_two from '../../Assets/BLAST2.png';
import BLAST_three from '../../Assets/BLAST3.png';
import BLAST_four from '../../Assets/BLAST4.png';
import BLAST_five from '../../Assets/BLAST5.png';
import BLAST_six from '../../Assets/BLAST6.png';
import BLAST_seven from '../../Assets/BLAST7.png';

export default function Blast() {
  return (
    <div>
        <Header/>
        <div className='BlastMain'>
            <h5>O matko to to będzie kobyła...</h5>
            <h2 className='center'>Programy BLAST - Basic Local Alignment and Search Tools</h2>
            <ul>
              <li>
                <h3>Co robi BLAST ?</h3>
                <p>Zbiór programów BLAST służy do wyszukiwanie i wykrywania podobieństwa w sekwencjach. Nie jest on programem, który dopasowuje sekwencje
                  (patrz <Link to='/local'>Dopasowanie Lokalne</Link>), lecz wyszukuje on sekwencje podobne z bazy danych, wskazując przy tym stopien podobieństwa, identyczności 
                  itd... (o tym później). Oczywiście, tworzy on Dopasowanie właśnie lokalne z tysiącami sekwencji i po tym znajduje właśnie wynik, ale sam w sobie jest
                  bardziej wyszukiwarką. Trzeba pamiętać, że jest to program Heurystyczny, czyli niekoniecznie pokazany wynik jest najlepszy
                </p>
              </li>
              <li>
                <h3>Działanie BLASTA</h3>
                <p>Zrozumienie działania programu jest bardzo ważne, ponieważ jest on jednym z 'podstawowych' tego typu programów i inne są do niego podobne.
                  Także zrozumienie jego działania pozwala na odpowiednie ustawianie parametrów wyszukiwanie. Dobra, teraz krok po kroku co robi BLAST.  </p>
                  <ol>
                      <li className='m10'><b>Na początku BLAST tnie podaną sekwencje na słowa (Words) i sąsiednie słowa (neighbouring words)</b>, tworząc z nich taką tabele "look-up", 
                        czyli taką z której będzie je brał i porównywał. Słowa (Words) to krótkie fragmenty sekwencji, a sąsiednie słowa (neighbouring words), to słowa,
                        które są akceptowane przez matryce punktacji, a to, czy są akceptowane, determinuje wartosc tzw. Threshold "T". Jakiej matrycy punktacji? Pamiętasz
                        jak działa dopasowanie lokalne, a dokładnie jegu punktowanie. Nie? To słabo :c. Bo to, co robi te  algorytm to tak jakby tworzy tą samą
                        macierz (tą tabelke), ale bierze pod uwage tylko punktacje po przekątnej, nie tworzy własnej ścieżki. W ten sposób albo znajduje słowa Identyczne,
                        albo takie, których punktacja odstaje delikatnie, właśnie nie więcej niż wartość T. Co bardzo ważne, na tym etapie algorytm NIE MOŻE TWORZYĆ
                        GAPÓW, więc dlatego bierze pod uwage tylko przekątną w takiej taveli (przypomnienie, jeśli ścieżka jest po przekątnej, to mamy identyczność 100%).
                      </li>
                      <li className='m10'>
                        Gdy znalezione zostają słowa, <b>program rozszerza podane słowa dokładnie tak jak w dopasowaniu lokalnym, aż liczba punktów zrówna się
                        lub przekroczy tzw. "Score Threshold".</b> Niestety, użytkownik nie ma możlwości ustawienia tego parametru, może za to ustawic do dopasowania
                        lokalnego punktacje za "match", "mismatch", "gap", "gap-extension". Nie wiesz co to? Patrz na <Link to='/local'>Dopasowanie Lokalne</Link>
                      </li>
                      
                      <li className='m10'>
                        Następnie, gdy uzyskana została maksymalna wartość punktowa, czyli "Score Threshold",<b> sekwencja dalej jest rozszerzana aż do momentu jej skończenia, czyli
                        uzyskania takiej samej długości (ale to tylko jak jest 100% to samo), lub do zmniejszenia się wartości punktowej do tzw. "X"</b>, które nawet nie ma nazwy XD, to
                         jesrt po prostu X w literaturze... No i jak to się stanie to wynik jest zwracany, tzn. jest wypisywany jako wynik 
                      </li>
                  </ol>
                  <p>I tak właśnie działa programik. Przy wyświetlaniu wyniki są sortowane i tyle :O. Teraz zobaczymy sobie panel i gdzie co wpisywać dla
                    jakich sekwencji docelowych
                  </p>
              </li>
              <li>
                <h3>Konfiguracja BLASTA, co robią dane Pola</h3>
                <ol>
                  <li className='m10'>
                    <p>Na początku trzeba zaznaczyć że mamy różne programy BLAST do wyboru:</p>
                    <ul>
                      <li><b>blastN</b> porównuje sekwencje nukleotydowe z nukleotydową bazą danych</li>
                      <li><b>blastP</b> porównuje aminokwasowe sekwencjie z aminokwasową bazą danych</li>
                      <li><b>blastX</b> porównuje sekwencje nukeotydowe z aminokwasową bazą danych, tłumacząc sekwencje nukleotydową na 6 różnych sposobów</li>
                      <li><b>tblastN</b> porównuje sekwencje aminokwasową z nukleotydową bazą danych, tłumacząc sekwencje aminokwasową na 6 różnych sposobów </li>
                      <li><b>tblastX</b> porównuje sekwencje nukleotydową z nukelotydową bazą danych, tłumacząc OBYDWIE sekwencje na aminokwasowe na 6*6 sposobów</li>
                    </ul>
                    <p>Opis będzie na blastN, bo tak :)</p>
                    <p>Nie no będzie też na blastP...</p>
                  </li>
                  <li className='m10'>
                      <h4>Krok - Wprowadzenie Sekwencji</h4>
                      <Photo className='BLAST_ph' src={BLAST_one} description='BLAST wprowadzenie sekwencji' />
                      <p>Wprowadzamy sekwencje przez wybranie pliku lub wpisanie. Subrange mozemy wybrac tylko wycinek z tej sekwencji... Job title no to nazwa pracy zeby lepiej wygladalo, align 2 or more no to 2 i bedzie dodatkowe pole</p>
                  </li>
                  <li className="m10">
                    <h4>Krok - Wybranie bazy danych</h4>
                    <Photo className='BLAST_ph' src={BLAST_two} description='BLAST ustawienia wyszukiwania' />
                    <p>Wprowadzamy dane do wyszukiwania, czyli</p>
                    <ul>
                      <li>Wybieramy baze danych, jest ich sporo, kazda ma inne właściwości, nie chce mi sie ich opisywac...</li>
                      <li>Możemy wybrać podzbiór organizmów, i opcje czy je bierzemu pod uwage czy je wyrzucamy (pole 'checkbox' exclude), np. Mouse, Human itp.</li>
                      <li>Exclude cos tam mozna wyrzucic</li>
                      <li>Entrez Query to jest Query do bazy danych, czyli specjalna mini baza danych ktora robimy, to nawet z boku jest tutorial jak to robic bo to trudne :O</li>
                    </ul>
                  </li>
                  <li>
                    <h4>Krok - Algorith Parameters (na dole pole z plusikiem trzeba je kliknąć i rozsunąć)</h4>
                    <Photo src={BLAST_three} className='BLAST_ph' description='BLAST parametry algorytmu' />
                    <p>Tutaj mamy parametry, które juz się pojawiały wcześniej gdy opisywałem jak działa BLAST, teraz je przedztawie jeszcze raz :)</p>
                    <ul>
                      <li><b>MAX target sequences</b> to jest ilość wyników, które się wyświetlą, nie zmienia to długości wyszukiwania</li>
                      <li><b>Short queries</b> Jeśli sekwencja wprowadzona jest krótsza niż 30pz, to BLAST zachowuje sie w inny sposób, wtedy wybieramy to pole</li>
                      <li><b>Expect threshold</b> To jest bardzo dziwny parametr. Odzwierciedla on liczbe dopasowań przewidywanych, w sensie tyle sie przewiduje że ich będzie.
                      W wynikach ta wartośc to jest to czerwone E(). Zmniejszanie tej wartości zwiększa surowość zasad, tzn. ogolnie będzie mniej wyników bo mają byc bardziej precyzyjne.</li>
                      <li><b>Word Size</b> Opisywałem je w tym, jak działa BLAST. pole to determinuje jak długie mogą być te słowa, które zostaną wycięte do I Etapu.</li>
                      <li><b>Match/Mismatch Scores, Gap Costs</b> Patrz <Link to='/local'>Dopasowanie lokalne</Link></li>
                      <li><b>Low Complexity Regions</b> regiony niskiej złożoności, filtrowanie tych pól sprawia, że algorytm nie bierze ich pod uwage. 
                      Co to jest jak nie wiesz to wpisz w wiki, ale wyniki z nimi często są nie informacyjne,i psuja statystyki i punktacje.</li>
                      <li><b>Mask for lookup table only</b> Oznacza to, że algorytm nie bierze tych częsci sekwencji (low complexity regions) 
                      W pierwszym etapie działania BLASTA, a potem już je bierze pod uwage.</li>
                    </ul>
                  </li>
                </ol>
                <h3>Szybko skoczymy jeszcze opisać pola dla blastP :)</h3>
                <Photo src={BLAST_four} description='blastP parametry wyszukiwania' className='BLAST_ph' />
                <ul>
                  <li><b>Databases</b> Nie bede opisywal tych experymentalnych..., Standard jest tak jak w nukleotydowym</li>
                  <li><b>Algorithm</b> Mamy tu do wyboru algorytm blasta, ktory uzyje. Najpoplarniejsze to wlasnie ten wybrany czyli zwykly blastP, oraz PSI-BLAST, ktory działa
                  na zasadzie wielokrotnego wyszukiwania w BLASTCIE aż znajdzie coś co 'matches the expectations'. A przez przechodniość jest to jakoś podobne do wyjściowej sekwencji </li>
                  
                </ul>
                <Photo src={BLAST_five} description='blastP parametry algorytmu' className='BLAST_ph' />
                <ul>
                  <li><b>MATRIX</b> matryca podstawień, patrz <Link to='/Theory/PamBlosum'>PAM i BLOSUM</Link></li>
                  <li><b>Dompositional adjustments</b> Są to blastowe poprawki do Matrycy. Zmieniają one trochę sposób punktowania.</li>
                </ul>
              </li>
              <li>
                <h2>Wyniki, Wnioski i ich interpretacja</h2>
                <h6>No i właśnie tu jest ta kobyła ło matko</h6>
                <h4>Dla ułatwienia dodaje obrazek z wynikami z wyszukiwania homologów dla sekwencji nukleotydowej o id:AF151353, DB: (nr/nt), Organism:mouse(taxid:10090), 
                  PS: megablast, uncheck Automatically adjust..., Threshold:1e-8, Word size: 20, scoring parameters: 1-4
                </h4>
                <Photo src={BLAST_six} description='Wyniki wyszukiwania, lista' className='BLAST_ph' />
                <Photo src={BLAST_seven} description='Wyniki wyszukiwania, wykres' className='BLAST_ph' />
                <h4>Tak to wygląda, mamy górną część z danymi tego, co wyszukaliśmy, i donlną, tą bardziej interesująca z wynikami.</h4>
                <ul>
                  <li><b>Scientific name i description</b> no nazwy po prosrtu</li>
                  <li><b>Max score</b> Maksymalna uzyskana punktacja w tym algorytmie. Pamiętasz kroki algorytmu? W drugim kroku BLAST rozszerzał
                  sekwencje do uzyskania wysokiego thresholda (nie tego co my podajemy !!!), tu jest pokazana mnaksymalna wartość do jakiej doszedł</li>
                  <li><b>Total Score</b> Pamietasz krok 2 Blasta po tym jak osiagnał MAX, potem dalej on rozszerzał selkwencje, i czasem punktacja sie zmniejszała</li>
                  <li><b>Query Cover</b> Jak dużo par zasad lub reszt się pokryło</li>
                  <li><b>E value</b> Jest to podany przez nas threshold wczesniej, w sensie my podalismy max wartosc. Jest to przewidywany odsetek lub ilosc takich sekwencji
                  Czym mneijszy przewidywany tym wynik jest bardziej znaczącym, np. wynik % identyczności jest bardziej znaczący przy mniejszym E value.</li>
                  <li><b>Acc. Len</b> Długość 2. dopasowania</li>
                </ul>
                <h4>Graf wydaje mi się że nie muszę opisywać jest dosyc oczywisty, więc lecimy <br />WNIOSKI:</h4>
                <p>Wnioskujemy, że ta sekwencja wsród myszy jest dosyc popularna, jest sporo wyników mające dosyc duże MAX SCORE takie jak TOTAL SCORE
                  , więc być może ta sekwencja koduje coś co jest w wielu innych np. Białkach. Oprócz tego musimy też popatrzeć na to gdzie znaleźliśmy pasujące sekwencje,
                  no czyli na ich nazwy i po nich to wywnioskować. Jak popatrzymy na graf, to widzimy bardzo dużo czerwonych. Zwróć uwagę, że jest tak bo ustawiliśmy bardzo niskiej
                  Threshold value na wyszukiwaniu, tj, 1e-8 , więc naprawdę niewiele, dlatego tez te sekwencje są tak podobne. Jednak nawet tak niewielka ilość thresholda 
                  Dała sporo wyników, dlatego właśnie możemy uznać, że jest to dosyc ważna sekwencja. W zakładce "Alignments" możemy też zobaczyć, jak lokalne dopasowanie
                  te sekwencje dopasowało i z tego wywnioskować być może rolę tego białka, dalej, jak byśmy szukali dla większewj ilości organizmów niż myszy, to można by coś wywnioskować
                  jeszcze dalej, że ta sekwencja jest w wielu organizmów, byc może kluczowa jeszcze od dinozaurów, jedna z pierwszych i tak dalej.
                </p>
              </li>
              <h4>No w tym stylu. Może tu jeszcze cos dopiszę ale już nie mam siły</h4>
              <h4>Pozdrawiam z rodzinką</h4>
              <h4>Błażej</h4>
            </ul>
        </div>
    </div>
  )
}
