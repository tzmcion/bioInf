import React from 'react';
import Header from '../../Header/Header';
import Photo from '../../../utils/Photo';
import './Fasta.css';

import FastaTB from '../../../Assets/Fasta_table.png';
import FastaEP from '../../../Assets/Fasta_Exm.png';
import FastaNC from '../../../Assets/Fasta_NC.png'

export default function Fasta() {
  return (
    <div className='FASTA'>
        <Header />
        <Photo className='Fasta_Exm' src={FastaEP} description='Przykładowy plik Fasta' />
        <h5>W biochemi i bioinformatyce, format FASTA jest tekstową reprezentacją sekwencji nukleotydowych lub aminokwasowych. Składa się on
            z dwu części:
        </h5>
        <ol>
            <li className='flex_middle'>
                <p>Pierwszą, tzw. opis pliku, zawiera informacje o pochodzeniu sekwencji, jej ID i nazwe, ale te informacje są różne, zależą od tego,
                które baza danych przechowuje ten plik. Informacje te są poprzedzone znakiem "&#62;".Jest on tylko w 1 linijce, zaś wiersze interpretacji odzielone są znakami "|",
                Tabela poniżej przedstawia różne możliwe zapisy tych danych.
                </p>
                <Photo className='Fasta_Table' src={FastaTB} description='Tabela przedstawiająca różne formy zapisu danych w różnych bazach danych. Zwróć uwagę, że pierwszy skrót to zawsze informacja o typie formatu FASTA (czyli jego pochodzeniu). Na zdjęciu na górze strony mamy plik z bazy danych GenBank' />
            </li>
            <li className='flex_middle'>
                <p>
                    Druga część pliku zawiera sekwencje. Jest ona aminokwasowa, bądź nukleotydowa. Zaznaczyć trzeba, że są one zapisane według konkretnego
                    kodu. W przypadku sekwencji nukleotydowych jest to kod IUB/IUPAC, w którym to mogą występować literki oznaczające np. "tu może być wszystko tylko nie Guanina" patrz tabelka poniżej. W przypadku sekwencji aminokwasowych, są to po prostu literki, gdzie każda oznacza 
                    inny aminokwas.
                </p>
                <Photo className='Fasta_NC' src={FastaNC} description='Tabela różnych liter w formacie FASTA sekwencji nukleotydowych.' />
            </li>
        </ol>
        <p>Plików FASTA można używać do. m.in porównywania sekwencji, szukania homologów, szukania ewolucyjnej ścieżki itd. Rozszerzenie pliku fasta, czyli to co 
            znajduje się po kropce w nazwie pliku, np. mydło.txt ma rozszerzenie .txt, katar.choroba będzie mieć rozszerzenie .choroba... Tak więc, rozszerzenie pliku fasta
            może się zmieniać zależnie od tego, co przechowuje. Zazwyczaj będzie to .fasta, ale może też być .fa, .fna (nukleinowa sekwencja), .faa (aminokwasowa sekwencja),
             czy też .ffn zawierające tylko regiony genomów/genomowe 
        </p>
    </div>
  )
}
