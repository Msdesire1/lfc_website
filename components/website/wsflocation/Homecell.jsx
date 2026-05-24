"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

const rawHomecellText = `ZONE\tNAMES OF HOME CELLS/ADDRESSES\tCELL LEADERS\tPHONE NO.
Zone 1\tDcns. E.T. Owolabi - 08030699102       / Pst. Babatunde A. - 08130735584\t\t
1\tISAAC                       5, Ikotun Road Off Pipeline Rd. Upper Gaa-Akanbi\tBro. Dapo Olaoye \t07063089566
2\tSARAH                    Okanfo Street Off Pipeline Rd. Upper Gaa-Akanbi\tDcns. Giwa\t08034755803
3\tABRAHAM             No. 8, /Second Street, Odo-Owa Street Gaa-Akanbi\tDcns Andi  \t07037106640
4\tKING DAVID         Adeyemi Atolagbe Onikanga village, near  CAC Sec School\tDcn. Olonitola D. A\t08024109530
5\tLIGHT                      Pst. Israel Aderonmu’s residence, off Pipeline, Gaa Akanbi\tBro. Ayodele Samuel\t07054466081
Zone 2\tDcns. Adedeji –  08032070155/ Pst. Babatunde A. - 08130735584\t\t
1\tREBECCA                 Opp. Royal Kids School, No. 20 Gaa-Akanbi\tDcns.  Irukera\t08032365991
2\tREPLENISH            No. 8B, Iri-Ibukun Street, Gaa-Akanbi \tDcns.  Adewoye\t08060216334
3\tHOUSE OF FAITH   Behind GDSS, Off Pipeline Road, Gaa-Akanbi\tDcns.  Aina Lydia\t08033580740
4\tISRAEL                     Alangua Street Gaa-Akanbi 2nd Street Opp. Alangua\tDcns.  Adedeji\t08032070155
5\tJOY  3                       Agba dam road, Yomi Estate\tMr   Ayodeji\t07030216220
Zone 3\tDcns. Ajiboye -   08033882241  / Pst. Adebayo Adeniyi/Pst. Olusanya  08034384686\t\t
1\tSUCCESS                  95, Gaa-Akanbi Area,Ilorin\tBro. Abraham M.\t07033263763
2\tJOSHUA                    62, Gaa-Akanbi Area,  Ilorin\tMrs Mary Alabi\t08064430357
3\tBLESSING 1            1, Omosebi Rd., Gaa-Akanbi/Elder Alere’s house\tBro. Kolawole Temi\t08169419029
4\tREDEMPTION       Opp. Celestial Church Gaa-Akanbi\tBro. Alfred Omidiji\t08063109966
5\tREHOBOTH  2       5, Sanya street, Oke Ogun Upper Gaa Akanbi\tBro. Damilare Steven\t08168780112
6\tZION II                     Oke Opin street, Gaa Akanbi\tMrs Oladimeji\t07066607871
Zone 4\tDcns. Giwa -  08034755803  / Pst. Adebayo Adeniyi/Pst. Olusanya  08034384686\t\t
1\tABEL 1                       56, Igbaja Rd. Gaa-Akanbi, Ilorin\tMrs.  Olufayo\t08037147950
2\tSHEKINAH                Corpers Lodge, Adjacent First Church \tBro.  Olusegun Daniel\t08052379772
3\tBLESSING                   2nd to the last house on Ogunlade Street, Gaa-Akanbi \tSis.  Sarah Blessing\t09151590669
4\tBEAUTIFUL GATE   Gaa Akanbi, off Offa garage road\tMrs Ade Adedokun\t07069030000
5\tABEL II                        Kayode Adekeye Street, Off Pipeline Rd. Gaa-Akanbi\tDcns  Ajibulu\t08051748867
6\tHERITAGE                 21, Benue Link/Lara Hotel area, Jatto Close, Gaa Akanbi  \tMrs  Ajayi \t08035988995
7\tGOD WITH US           Pipeline road, Gaa Akanbi\tBro.  Stanley Osondu\t09062161668
Zone 5\tMrs  Ejigboye - 09031872035/   Pst. S. Giwa – 08038131199\t\t
1\tDELIGHT                   Pst. Owolabi’s residence, Pipeline Area\tSis. Andi\t07033951306
2\tBLESSING II              Pst. Ajiboye’s residence,  Pipeline Area \tSis. Aluku\t08056488560
3\tREJOICE                     Engr. Adeniyi residence, back of Ebenezer Schl, Gaa Akanbi\tMrs. Alashi\t07034519474
4\tISSACHAR                 CBN Quarters \tMrs. Ejigboye \t09031872035
5\tTREASURE                Mummy Osegu’s residence, Pipeline Area \tSis. Oseji\t08146460160
Zone 6\tDcns. Babatunde 08136182349  / Pst. S. Giwa – 08038131199\t\t
1\tLAUGHTER               Adewuyi’s Residence around Wale Water \tDcns. Babatunde \t08136182349
2\tFREEDOM I               Elder Mrs. Olugbemi’s Residence Pipeline Rd, Gaa Akanbi \tMrs. Ekwebelem \t07057374421
3\tFREEDOM II             Behind Calvary Baptist Chu Upper Gaa-Akanbi \tMrs. Tolu Oluwole\t08165120323
4\tFRUITFULNESS       Pst. Godspower’ s residence, Pipeline rd, Gaa Akanbi\tDcns. Okoh\t08078926344
5\tREJOICE II                 Behind Calvary Baptist Church Upper Gaa-Akanbi \tMrs. Yetunde \t08038301974
6\tHALLELUYAH          Eldr. Ekwebelem’s residence, Pipeline road\tEldr. Ekwebelem\t08034918403
Zone 7\tDcn. James Dada - 08037112786  / Pst. Israel – 07018162981\t\t
1\tPETER                        Maja Maja Street, Elder Omofelu Residence \tDcns. James .O.R\t08035023805
2\tPOWER   4, Joseph Bamigboye Str, Eldr Adu Residence Onikanga, up Gaa-Akanbi\tMrs. Adeniyi .T.M\t08107324560
3\tGOSHEN II              Onireke Junction, By Alao Farm Agbabiaka, Upper Gaa-Akanbi\tDcn. D. Olorunnisola\t08093426781
4\tCOVENANT       Eldr Omofelu Street, Maja Maja Road Ifetedo Community Danialu \tBro. James Olalekan \t07032764592
5\tJERUSALEM            Dangote Cement Depot @ Dcn. Adesina Residence \tDcn. Adesina .O\t08033703382
6\tMERCY 2                     Agbabiaka area, Upper Gaa Akanbi\tMrs Abiodun Isola \t08066647541
Zone 8\tDcn. Arotiba  - 08033576938 /    Pst. Israel – 07018162981\t\t
1\tMARY 1                 Ita-Olodan Area, Arotiba Residence\tDcn. Arotiba .O.W\t08033576938
2\tMARY II                 Ita-Olodan, Upper Gaa-Akanbi\tMrs. J. Awotunde   \t08033485952
3\tADAM 1                Ife-Oluwa Community Behind GDSS Agba-Dam\tDcn. Abiodun \t08065201663
4\tADAM II               Ifesowapo Community @ Adeleke’s Residence  \tMr. Adeleke\t08035023719
Zone 9\tDcn. Abodunrin J.O. 08038314230 / Pst. Samson Abodunrin - 08035608441\t\t
1\tJOHN 1                              No. 14, Adediyun Street Olorunsogo Gaa-Akanbi \tDcn. Abodunrin \t08038314230
2\tRICHES                             No. 176, Isokan Community Olorunsogo Gaa-Akanbi \tDcns. Badiru \t08038231606
3\tABUNDANT GRACE II       42, Harmony Street By ECWA Junction Agbabiaka\tMrs. Owolabi\t07033915498
4\tROSE OF SHARON   A32, Danialu area, Behind Godly Repentance, Gaa Akanbi\tDcns. Israel\t08033286459
5\tADORATION                  Upper Gaa Akanbi, off Agbabiak, Onireke Area\tMrs Adeboye\t08063725625
6\tMARY III,            Ago Aiyekale, Upper Gaa Akanbi/Agbabiaka\tBro. Idowu Suleiman\t
Zone 10\tDcn. Omole J.O. 08055163467 / Pst. Samson Abodunrin - 08035608441\t\t
1\tDOMINION 1       Eni lo lobo Street, Opp. Adap Hotel Temidire Upper Gaa-Akanbi\tDcns. Olusoji\t07033973201
2\tOBEDEDOM        24, Harmony Street Danialu\tDcn. Omole J.O\t08094851274
3\tSHILOH                 Zone 3 Area, Ago-Aiyekale\tMrs. Theophilus\t07064745612
4\tSHARON        Behind Ayo Ade Hospital Olorunsogo, Gaa-Akanbi, down the Street\tDcns. Tomi Adeyina \t08039733145
Zone 11\tDcn. Goke - 08060607001/ Pst. Joseph Owolabi -  08030699099\t\t
1\tALPHA I                    Adjacent Kwara Furniture, Gaa-Imam\tBro. John Gwatana\t08065076015
2\tFORTUNE                Opp. Winners Chapel, Gaa-Imam\tBro. Aaron Emman\t07036122688
3\tPROGRESS               LFC New-jerusalem, Gaa-Imam\tBro. Tosin Dada\t08067659421
4\tGLORY                        Yomi Estate, Gaa-Imam\tAmos Olayinka\t08102369924
5\tLIBERATION            Opp ITC behind Kwartima office Ilorin\tBro. Oyelowo Seye\t08034898543
Zone 12\tDcns. Omole 08034550384  /  Pst. Joseph Owolabi -  08030699099\t\t
1\tSAMUEL                   No. B2, Gaa-Imam Area, Ilorin \tBro. Joseph Ajayi\t08030608734
2\tINCREASE               Behind OFM, Gaa-Imam, Ilorin \tBro. Marvelous\t08064757618
3\tRHODA                    Opposite Biomedicals, Gaa Imam \tBro. Olawepo\t08038099108
4\tLIBERATION 2      Behind NSCDC Command office, Gaa Imam area\tMr Atanda\t08184035411
5\tLIBERATION 3       Opposite NSCDC Command office, Gaa Imam\tMr Oyibo\t07037003226
6\tOBED-EDOM            Behind Kwatima building, Gaa Imaam\tMr Emmanuel\t08038913676
7\tMARVELLOUS II      Opposite C & S OLORUN ISADI, Gaa Imam\tMr Atu Emmanuel\t08102208866
Zone 13\tDcn. Attah James 08068863699 / Pst. Joseph Owolabi -  08030699099\t\t
1\tHEPHZIBAH            41D, Budo Giwa, Gaa Imam\tDcn. Osamika\t07064900048
2\tCOVENANT              Olorun Isadi Avenue, Behind Kwara Ethnix, Ilorin\tBro. Agbede\t08033727749
3\tREHOBOTH  II            Behind Biomedical Company Gaa- Imam\tBro. Ayo Alabi\t08036825324
4\tPENIEL                       Close to Railway Lane , Gaa Imam\tBro. Koleola \t08069503639
Zone 14\tDcn. Chibuike Nwokodi  08030859229 / Pst. Adebayo Adeyina - 07033330765\t\t
1\tLEAH                                  Baba-Ode\tDcns. Adebayo E.F.\t08034187218
2\tNEW HEAVEN                 Baba Ode area\tDr. Dapo Oyedepo\t08032201305
3\tARK OF TESTIMONY   Babaode\tMrs Debbie Oyetunde\t07032444832
4\tDELIGHT  II                     Baba Ode @ Bolarinwa house\tBro. John Jimoh\t08148473328
Zone 15\tDcn. Andrew James  07032877828 / Pst. Adebisi Adeyina - 07033330765\t\t
1\tPETER  II                  13, Coca Cola road           \tBro. Elisha Tuesday\t08066211673
2\tPECULIAR              Doctor Quarters, Coca-Cola Road   \tBro. Adeyemi\t08037631744
3\tISAIAH                     Layo Hotel, Coca-Cola Road\tSis. Ibukun Layonu\t08032429870
4\tGRACIOUS              Baba Ode\tDcns. Grace Erabor\t08030813206
Zone 16\tBro. E. Emmanuel - 07069101418 / Pst. Ajiboye - 08037211707\t\t
1\tJOSEPH                      13, Baba Saraki/ Ipaiye Street, GRA\tMrs Olaore\t08032146202
2\tMIRIAM                     4, Agba Road, GRA, Ilorin (Mama Ayesimi’s House)\tBro. Eyika Emmanuel\t07069101418
3\tPROSPERITY              Block U Flat 1, “A” Division Barrack, Ilorin\tMrs. Esther Olatayo\t08039547942
4\tJONATHAN  at ELDER OYEDEPO’S HOUSE)\t\t
Zone 17\tDcns. Bukola Aina - 08038380332 / Pst. Ajiboye - 08037211707\t\t
1\tGLORIOUS                    1, Police Road, GRA (@ Pastor John Mark’s Shop)\tPastor John Mark\t08033591614
2\tNATHANIEL                Block E, Flat 6, “A” Division Police Barracks Ilorin\tBro. Jolayemi Olatayo\t08039425634
3\tELIJAH                          Opp. Ekundayo House, Ekundayo Close, GRA/Waterview\tBro. Niyi Awopegba\t08060936628
4\tMERCY  2                     2, Police rd, adjacent opp. Pst. JohnMark’s Studio, GRA\tMrs Bukola Gbuuga\t08023242097
5\tTESTIMONY 2: @ Water view /CBN Quarters@ Justice Ajayi residence\tDcns. Bukola Aina\t08038380332
Zone 18\tDcn. K.T. Owolabi -  08034458026 / Pst. Adedayo S.M.  08033821984\t\t
1\tDANIEL I                         3, Oke-Ode Close, GRA, Ilorin \tMrs. Adedayo \t08062422393
2\tSOLOMON IV                    E-Phoenix Hotel rd, GRA\tBro. Olusoji Gabriel\t08085082294
3\tDAVID  II                         Along Justice Gbadeyan’s residence, GRA  \tMr. David Otaru\t08033665544
4\tABUNDANT GRACE I   Pipeline area\tMrs. Oyedokun\t09090482324
Zone 19\tDcn. K.T. Owolabi -  08034458026 / Pst. Adedayo S.M.  08033821984\t\t
1\tDAVID 1                           9, Ijomo-Street, GRA/ Sabo-Oke, Ilorin\tMr. Olayinka Balogun\t08036793833
2\tSOLOMON 1                  14, Olorunishola Street, GRA\tMrs. Khobe M.\t08035889137
3\tSOLOMON 2                   9, Yusuf Idi-Aro Street, GRA\tDr. (Miss) Bisayo\t08034006013
4\tSOLOMON  3                   2, Honey Road, GRA, Flower Garden Area\tElder (Mrs) Oyinloye\t08185780044
5\tABUNDANT BLESSING   Behind CBN, Offa Road/ Dcns Aroyehun Residence \tBro. Matthew Thomas\t08109651705
6\tDANIEL 2                             Yoruba road Phase II\tMrs Folasade  Ayejuto\t08060208366
Zone 20\tDcn. Faith Oluleye  08039542156 /  Pst. Adesina Adegbite - 08060983583\t\t
1\tJOY  1                         Shop 5, Niger Road, \tDcn. Oluleye \t08039542156
2\tSIMON                       Beside Akintunde Bread, Emirs Road  \tDcns. Akinwale\t08060236219
3\tCOVENANT              Bro. Ikechukwu house, Irewolede, off Cemetry rd \tBro. Ikechukwu\t09039728337
Zone 21\tDcns.  Akinwale 08060236219 / Pst. Adesina Adegbite - 08060983583\t\t
1\tJOEL                                     Railway lane/Unity Road Beside First Bank \tMarvelous Owolabi \t07063217183
2\tJOYFUL                               Obbo Road \tDcn. Emeka\t08063268291
3\tBETHEL                              Winners Satellite Centre, Emir’s Road\tSis. Moyinoluwa Akolo\t08105624955
4\tBREAKING LIMITS         Beside FIRS Office, Obbo rd\tBro. Sunday Okereke\t08137996816
5\tCONQUEROR                    Lajonrin road\tMrs Peterside\t08036161344
6\tGOD’S OWN                      Opposite Unity Bank, M/Muhammed road \tBro. Jeremiah\t
Zone 22\tDcns. Oluleye 08139395515 / Pst. Philip Oyedemi - 08160974867\t\t
1\tESTHER                 Beside All Saint Anglican Church, Taiwo Isale\tDcns. Oluleye \t08139395515
2\tMANASSE 2          Beside BOB Sege Photo Lab, Taiwo Isale   \tMrs Oyetunde\t08039410215
3\tEMMANUEL          Opp. Taiwo Isale Market\tMrs Faith Ezedika\t07067411488
4\tJUDAH                    Near Tobi Hospital, Taiwo Ilorin \tBamigbose James A.\t08176758370
5\tDEBORAH             Staff Quarters, Queen School, Ilorin   \tDcns. Adeola Ajide \t08032884646
Zone 23\tBro. Olabode David 09134831060 / Pst. Philip Oyedemi - 08160974867\t\t
1\tFRUITFULNESS  I        Sawmill, behind White House, near Oluwatoyin Bread, \tDcns. Taiwo Agbana\t08135449622
2\tFRUITFULNESS II       Odo-Efo, Osere, Off Oko-Erin, Ilorin \tMr. Owolabi Sunday\t08033042151
3\tZEBULUM                      Oko Erin area, Beside Profile Hotel \tMrs. Egunjimi R.O.\t08054751073
4\tLEVI                                 Oko-Erin Behind Top Biz, Ilorin \tBro. Olabode David \t09134831060
Zone 24\tMr. Samson Adenihun - 08033615845/ Pst. Ajide 08035474858\t\t
1\tREDEEMER                 Asa dam road, Tipper garage\tMr. Samson Adenihun \t08033615845
2\tHANNAH 2                  Jooro, Asa-Dam Road\tMrs. Adigun\t07067793343
3\tHAVILLAH                   Jooro/Asa dam area, off Opp. ITF\tEldr. Makanjuola \t08035007787
4\tGARDEN OF EDEN    Behind Kamwire/NNPC Industry, off Asa dam rd\tDr. Agbede\t08065502864
5\tGREATNESS              at Olorunsogo area\t\t
Zone 25\tDcn. Olorunnishola - 08093426781/ Pst. Ajide 08035474858\t\t
1\tGRACE    Eldr. Bamidele’s residence, Stadium Road 4, Baragbon Close\tDcns. O. Oyinloye  \t08186529823
2\tREHOBOTH  Abiola close, Oro road, off Stadium   \tBro Peter Chimeze\t08064344112
3\tZION  Eldr. Mrs Adepoju residence, Behind Busari Alao College, off New Yidi rd.\tEldr. Mrs Adepoju\t07060871151
4\tHOUSE OF PRAISE   Behind Busari Alao College, off New Yidi rd \tSis. Evidence Adegbite\t08028492063
5\tGLORIOUS  Eldr. Bankole’s residence, Mandate I, Irewolede.\tEldr. Mrs Bankole\t08055160428
Zone 26\tMrs   Adedokun 08034488158  / Pst. Abimbola Ajiboye 08062744085\t\t
1\tHANNAH 1        @Dcn. Wale’s residence, Behind Eucharistic College\tMrs. Adedokun\t08034488158
2\tMIRACLE I          New Era Estate, behind Eucharistic College, Asa dam rd\tBro. Segun\t07066721703
3\tARK OF TESTIMONY   Adjacent Ebunlomo Guest House Oshin Oseni\tBarr. James David\t08064431866
4\tMIRACLE II:         Behind Eucharistic College\tBro. Alfred\t08077860595
5\tHOUSE OF TESTIMONY Along Alli Ara area, far behind Eucharistic College\tSunday Odeh\t08060775433
6\tRIGHTEOUS CITY    New Era Water-view Community, off Asa dam rd\tMrs  Daramola \t08034662070
7\tTRIUMPH       35, De-Wise street, New Era Water-view community, off Asa dam\tMrs Esther Olushola \t08121345650
Zone 27\tPst. Yomi Oseni – /      Pst. Yomi Oseni      08029072850\t\t
1\tRESTORATION    Checking Point, (White House, Near Success Home Cell)\tDcn. Soetan \t08023573837
2\tSUCCESS               Dcn. & Dcns. Agboola’s residence along Airport road \tDcn. Agboola\t08035047490
3\tHOPE                     Airport  Area, Behind NURTW Office \tMrs. Akinola Rufus \t08036112882
4\tZEPHANIAH        Egbejila area\tMrs Ezekiel\t07089674662
5\tEden                  Pst. Yomi Oseni residence, Airport Area\tPst. Yomi Oseni\t08066382572
Zone 28\tMrs Rosemary Yisa:   08104040040 / Pst. Akinpelu - 09139292651\t\t
1\tGLORY II                        Opp. Woye, Behind Brain Filled Academy Gaa-Akanbi\tBro. S.O. Emmanuel\t08062118190
2\tELIZABETH                   No. 3, Owa-Kajola Street, Gaa-Akanbi \tDcns. Ruth Giwa\t08060871485
3\tDEW OF HEAVEN        Eruda area, off Taiwo \tMrs  Faith Ogboji\t09131494122
Zone 29\tMrs Rosemary Yisa  08104040040  / Pst. Funsho Agbana - 08033862502\t\t
1\tEZEKIEL               Elder Olawaiye’s Residence Behind ‘F’ Division Tanke \tSis. Ajirola\t08064755409
2\tCANAAN               Elder Mrs Ilesanmi residence, Tanke \tEldr. (Mrs) Ilesanmi\t08034360166
3\tABIGAIL               Behind GDSS, Tanke, Mumy Abass residence\tBro. Lekan\t08060620378
4\tMATTHEW          Pst. Salami’s residence, off F Division, Tanke\tPst. Salami\t08055571061
Zone 30\tDcns. Nike Babajamu  08034269020/ Pst. Funsho Agbana - 08033862502\t\t
1\tLOVE                              Dcn. Isawode residence, Awolowo road                       \tBro. Kayode Dada\t08036989751
2\tAMOS                             Behind Mount Olive Church, Tanke\tJoshua Juwunde\t08062606921
3\tASHER 1                       Awolowo Road, @ Babajamu’s Residence, Tanke\tDcns. Nike Babajamu\t08034269020
4\tKINDNESS                    Behind Minarret School, off Awolowo, Tanke area\tSister Dupe Idowu\t08034432858
5\tTABITHA                      off Awolowo road, Tanke\tDcns. Abayomi\t08039762773
Zone 31\tDcns. Adejumo  - 08032817001  /Pst. Salami - 08055571061\t\t
1\tEXCEEDING GRACE    Bolumole Area, Awolowo Road, Tanke\tMrs. Oyinloye\t08039248908
2\tJOSIAH 1                        Off Eastern Reserviour Road, Tanke\tDcns. Soetan\t08050733639
3\tJOSIAH II                        Off Fatai Afolabi Street\tMr. Oluwabukunmi\t08039288969
4\tGLORY  No. 31, Grace Community, Lightway School, Off Awolowo Road Tanke\tEngr. Charles Olowa\t08033834229
5\tEXCEEDING JOY    2, Tai Farounbi str, near Complete hotel/off Dele Gege str, off Awolowo road, Tanke\tArc. Femi Abogunrin\t08035501508
6\tABUNDANT GRACE        Varsity Avenue, Tanke\tDcns. Stella Obaoye\t08036806110
Zone 32\tDcn. Charles Olowa - 08033834229  / Pst. Salami - 08055571061\t\t
1\tGAMALIEL                    After ‘F’ Division Behind Seed of Life Tanke \tSis. Grace\t08030761388
2\tUNLIMITED GRACE    No. 1, Pa. Oset Close, Opp. Anchormed Hospital, Tanke\tMr. Afolabi\t08066849660
3\tNEW DAWN II     37, Oke-Onigbin Str, Fmr Dep. Governor’s House Off ‘F’ Div. Tanke\tMrs Funke Kolade\t08033566145
4\tYAHWEH                              No. 9, Adesola Akanji Street Beside Ilesanmi\tMr.  Jeremiah\t08065212116
5\tBEULAH                               2, Oloshi Street Off Pipeline Road\tBro. Adenaike\t07031753129
6\tEXCEEDING LOVE            Anchor Hospital way, off Pipeline, Tanke\tMrs Loveline Nwabuisi\t08034326764
Zone 33\tMrs. Funke Kolade  08033566145   /Pst. Adeyemi M.     08130735584\t\t
1\tHOSSANAH                  Pst. Samson residence, Behind Favour Hall, Pipeline \tSis. Faith Abodunrin \t08030726329
2\tGREATER GRACE      Alao Farm Tanke \tBro. Dapo Obaro\t08030791986
3\tSOLOMON                   Tanke Akata\tMr Adebisi\t08033813874
4\tANDREW                     Akata Leader Street, Tanke \tDcns. Owolabi\t08133178811
Zone 34\tDcns. Caleb -  08033880082 / Pst. Samuel Ijeh - 08060224277\t\t
1\tLOUIS                       Idi Cashew after RCCG House of Favour Ita-Elepa\tMrs B. Ajayi\t08161800325
2\tDOMINION II       Anu Oluwapo Community Ita-Elepa\tMrs Oni\t08036640798
3\tPRAISE LAND     Before Salem Nur/Pri School, Ita-Elepa after Transformer Line\tMrs Joshua\t08060554309
4\tENOCH                   Pst. Adebayo’s residence, Osin-Olatunji\tDcns. Kate Adeniyi\t08160325333
Zone 35\tDcns. Caleb – 08033880082  / Pst. Samuel Ijeh - 08060224277\t\t
1\tTRUTH                               Pastor Ijeh’s residence, Oshin Aremu area\tDcns. Ijeh\t08067619731
2\tHONOUR                           No. 30b, Idi-Emi Osin \tDcns. Caleb \t08033880082
3\tSIGNS & WONDERS       Adjacent Kangu Satelite Church\tBro. Daniel Akinola\t07035721385
4\tPEACE                                 Opposite St. Joseph Hospital, along LFC Kangu  \tMrs Bolarin   \t09160946582
5\tBREAKTHROUGH          Untarred road before Atau Schl, 1st building by the right\tMrs Samson\t08064737996
Zone 36\tMrs Ashimolowo O. 08056643651/Pst. Olorunfemi Emmanuel- 07060450625\t\t
1\tPRISCILLA           Last turning to Ita-Alamu Bus-Stop Beside Redeemed Church \tMrs Ashimolowo O.\t08056643651
2\tWISDOM 1           Beside DSS Quarters, Alagbede Area, Ita Alamu, Ilorin \tBro. Ajiboye\t08030612404
3\tDOMINION III     Ita-Alamu (YEMO Oil Area)\t\t
4\tGOODNESS           Behind DSS Qtrs, Kilanko\tPst. Ogbondeminu\t08038624289
Zone 37\tBro. Sunday Oni - 08057740331 / Pst. Adebayo Adeniyi - 08033667800\t\t
1\tAQUILLA                  Ita-Aisha Olunlade Area, Pst. JohnMark’s residence \tDcns. Olawumi\t08133356624
2\tGLORY II                 Opp. Olabimpe Street, Olunlade\tSis. Mary Olaoye\t09037072062
3\tGRACE                      Bro. K. Adenigba residence, Olunlade Area\tBro.  K. Adenigba\t08064181595
4\tGLORY I                   Olunlade Area      \tMr  Ajiboye\t08035017599
Zone 38\tDcns. Adewuyi   08033071308 / Pst. Tola Durojaye - 07033561085\t\t
1\tHOPE 2                     Olunlade Majeasurawa\tMrs. Tope Adebayo \t08032233958
2\tJOSEPH 1                 Behind Abiye Ganmo\tMrs. Oyeniyi \t08140316308
3\tGRACE 1                   Olunlade Area, Majeasurawa, Ilorin\tMrs. Adewuyi \t08033071308
4\tDIVINE                      Ogbondoroko area\tMrs Babare\t08060554940
5\tMERCY                      Olunlade, Idi-Ogede area\tDcns. Victoria Adedayo\t08030575641
6\tBETHEL 2                8, Ibukun Oluwa str, Temidire behind Powerline, Ganmo \tDr.  Adetola Ayanda\t08067007619
Zone 39\t Dcns. V. T. Odugbemi - 07064405184     / Pst. Tola Durojaye - 07033561085\t\t
1\tNISSI                          Akata Gado Ganmo\tMr. Olushola F.\t07034696982
2\tDAVID                       Iyana Afon, llorin \tMrs Abiodun\t08130575862
3\tISAAC                         Ganmo\tMrs Kolapo Anike\t08034800922
4\tNISSI                          Akata Gado Ganmo \tMr. Ayodeji S.\t07065947954
5\tCORNELIUS             Sapati Area by White Flag Hotel, Ganmo   \tMrs Bukola Cornelius\t08032401743
6\tDELIGHTSOME      Ganmo area\tDr. Adeniyi Ayanda \t08030612404
Zone 40\tDcns. Odugbemi V.T.  07064405184 /Pst. Jacob Akinola - 07032061244\t\t
1\tVICTORY I             Behind CAC Alabukun Amoye \tMrs. Oriyomi\t07033371556
2\tVICTORY II            Behind Pastor Adeboye Head House Amoyo\tOloyede Kikelomo\t08107321019
3\tVICTORY III        Behind Ola-Oluwa Foundation N/P School Kabba-Kajola Amoyo\tDcns. Olorunshe\t08030537743
4\tDAVID                    Behind Oluwatobi block Industry, Amoyo\tDcns. Odugbemi  V.     \t07064405184
5\tEMMANUEL 2       Lawal’s residence, behind a Telecom Mast  Amoyo \tDcns. Lawal K.F. \t08060110826
Zone 41\tDcn. Alabi  - 08035026567  / Pst. Ogbondeminu – 08038624289\t\t
1\tHOREB                 Elder Mrs. Ayeni Residence Kilanko\tSis. Iyanu Abidemi\t08149914221
2\tGRACE                  Dcns. Saibu Residence Kilanko, Ilorin\tMrs Adeniyi\t07039028864
3\tPRAISE                 Beside Elder/Mrs. Ayeni Residence Kilanko, Ilorin \tBro. Dada Joel\t08038571127
4\tDIVINE                 Dcn. & Dcns. Ayeni Residence Opposite Saw-Mill Kilanko Ilorin \tBro. Bode Adeola\t07030577111
5\tCROWN          No. 29, Maliki Street, Kilanko Ilorin \tMrs. Alabi\t07039176848
Zone 42\tDcns. Dupe Shaibu - 08038047801     / Pst. Joseph Owolabi -  08030699099\t\t
1\tTRIUMPHANT      Oluwatedo community Ita-Alamu             \tBro. Wale Olabode\t08033826997
2\tVICTORY                No. 46, Behind Kwara Express Offa Garage\tDcn. Ojo\t08032385021
3\tREJOICE                  Alenibare Community, No. 14, Lane 1\tMrs. Oyinloye \t08035639850
4\tTESTIMONY          Olanrewaju Estate \tMrs Adenike E. \t08063944233
5\tCITY OF REFUGE     Pst. Musa Abiodun residence,\tDcns. Abiodun\t08023634252
6\tABUNDANT LIFE    Along Leah Water/Iwo street, off Offa garage\tBro. Oladosu \t08168960614
Zone 43\tDcns. Ayorinde – 08035964937 / Pst. Agboola – 081626334773\t\t
1\tMESHARCK 2            Along Bravo Petrol Station, Royal Valley Estate, Kulende\tMiss. Vero Egeruran\t08032097007
2\tSHEDRACK 1             Agric  Area 2\tDcns. Oluwatoye\t07062662096
3\tGILGAL                        Along Oyun\tDcns. Agboola\t08147866425
4\tMESHARCH 1            2, Ajeigbe Peace, Ganiki Sango Area, Ilorin\tDcns. Ayorinde\t08035904937
5\tGILGAL 2,          Idi Igba Were along Royal Valley Housing Estate, Kulende\tMrs Comfort Egamama\t
Zone 44\tDcns. Ameen  - 08055801789 / Pst. Oluseyi Adebisi - 08062603113\t\t
1\tABEDNEGO 1           Fufu New Market, Sabo-Oke\tBro. Ebenezer\t08035539260
2\tABEDNEGO II           Agric Area \tBro. Olivert \t08034478066
3\tSHEDRACK  2             No. 3, Aduralere, Amilegbe \tDcn. Ibitomisin \t08147850888
Zone 45\tDcns. Owolabi F.   08056559212 / Pst. Akinpelu - 09139292651\t\t
1\tREHOBOTH  III                Basin Road, Opp. Ayobami Pharmacy \tBro. Mike Afolayan \t08035477622
2\tGOODNESS                        Foyeke Lane, Off Basin Road 2nd turn by the left\tMrs. Y. Bayode \t08032888570
3\tGLORIOUS                         Federal Staff Qtrs, Behind Federal Secretariat, Fate \tBro. Ben \t08024722710
Zone 46\tDcns. Alaba Oyinloye - 08186529823 / Pst. Akinpelu - 09139292651\t\t
1\tMOUNT  ZION                   Oke Andi\tDcns. O. Oyinloiye\t08035693949
2\tHEPHZIBAH                      7, Mayowa Street\tMrs. Makanjuola\t08161673484
3\tDANIEL  2                          E-Phoenix Hotel street, GRA \tDcns. Akinpelu\t08185780044
Zone 47\tDcns. Elegbede  -    08116896378   / Pst. Taiwo Agbana - 08060229035\t\t
1\tJOY  2                                                3, Cemetery rd, Irewolede –Oseere area\tDcn. Adeniyi Adetayo\t08032989533
2\tMOUNT OLIVE                               Zone 4, No. 84, Aiyegbami street, Oseere\tMrs  Feyi Olakanmi\t08168848658
3\tHOUSE OF TESTIMONY 2         Bioyin Events area, Igbo-Owu Poly area, Oseere \tPst . Phillips Oyedemi\t08160974867
4\tHIS PRESENCE                             Dcn. & Dcns. Elegbede’s Residence, Oseere\tDcns. Elegbede\t08034287824
Zone 48\tPst. Abiodun Musa - 08164756622\t\t
1\tEL-SHADDAI                     Ita-elepa area\tMrs Olushola\t08064883798
2\tADAMS III                          Budo-Iya, D/Avenue under the bridge \tBro Olumide\t08068585548
3\tSHALOM                            Opp. Omega Rocks Ita Elepa \tMr Pelumi Ekundayo \t08166616847
4\tWONDERLAND               Behind Iyanuoluwa Bakery, Oshin Okete\tDcn. Oyedepo\t08035493801
`;

const parseHomecellData = (source) => {
  const rows = [];
  let currentZone = "";
  let lines = source.split(/\r?\n/).map((line) => line.trim());
  let pendingRow = null;

  const normalize = (value) => value.replace(/\s+/g, " ").trim();

  const isZoneHeader = (line) =>
    /^Zone\s*\d+/i.test(line) || /^ZONE\s*\d+/i.test(line);

  const parseRow = (line) => {
    const splitByTabs = line.split(/\t+/).map((part) => normalize(part)).filter(Boolean);
    if (/^\d+\b/.test(line)) {
      if (splitByTabs.length >= 4) {
        return {
          id: normalize(splitByTabs[0]),
          name: normalize(splitByTabs[1]),
          leader: normalize(splitByTabs[2]),
          phone: normalize(splitByTabs.slice(3).join(" ")),
        };
      }

      const match = line.match(/^\s*(\d+)\s+(.+?)\s{2,}(.+?)\s{2,}(.+)$/);
      if (match) {
        return {
          id: normalize(match[1]),
          name: normalize(match[2]),
          leader: normalize(match[3]),
          phone: normalize(match[4]),
        };
      }

      if (splitByTabs.length === 3) {
        return {
          id: normalize(splitByTabs[0]),
          name: normalize(splitByTabs[1]),
          leader: normalize(splitByTabs[2]),
          phone: "",
        };
      }

      if (splitByTabs.length === 2) {
        return {
          id: normalize(splitByTabs[0]),
          name: normalize(splitByTabs[1]),
          leader: "",
          phone: "",
        };
      }
    }

    return null;
  };

  lines.forEach((line) => {
    if (!line || line.startsWith("ZONE NAMES OF HOME CELLS")) {
      return;
    }

    if (isZoneHeader(line)) {
      const parts = line.split(/\t+/).map((part) => normalize(part)).filter(Boolean);
      currentZone = parts[0];
      if (parts[1]) {
        currentZone = `${currentZone} — ${parts[1]}`;
      }
      pendingRow = null;
      return;
    }

    const row = parseRow(line);
    if (row) {
      row.zone = currentZone;
      row.type = "cell";
      rows.push(row);
      pendingRow = row;
      return;
    }

    if (pendingRow && pendingRow.type === "cell") {
      pendingRow.phone = normalize(`${pendingRow.phone} ${line}`);
      return;
    }
  });

  return rows;
};

const tableData = parseHomecellData(rawHomecellText);

const headerColumns = [
  { label: "Zone", key: "zone" },
  { label: "Home Cell / Address", key: "name" },
  { label: "Cell Leader", key: "leader" },
  { label: "Phone No.", key: "phone" },
];

const getSortValue = (item, key) => {
  if (key === "zone") return item.zone.toLowerCase();
  if (key === "name") return item.name.toLowerCase();
  if (key === "leader") return item.leader.toLowerCase();
  return item.phone.toLowerCase();
};

export default function HomeCellDirectory() {
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "zone", direction: "asc" });

  const filteredRows = useMemo(() => {
    return tableData.filter((item) => {
      if (item.type === "zone") return false;
      const query = search.toLowerCase();
      return [item.zone, item.name, item.leader, item.phone]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query));
    });
  }, [search]);

  const sortedRows = useMemo(() => {
    const rows = [...filteredRows];
    rows.sort((a, b) => {
      const aValue = getSortValue(a, sortConfig.key);
      const bValue = getSortValue(b, sortConfig.key);
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return rows;
  }, [filteredRows, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / entriesPerPage));
  const paginatedRows = sortedRows.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="w-full bg-[#f7f7f7] py-10 px-4 lg:px-10">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="text-sm text-[#EC3237] font-semibold">
          Search for a home cell by zone, cell name, address, leader, or phone number.
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Show</label>
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none"
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-600">entries</span>
          </div>

          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search location, address, leader or phone..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 outline-none focus:border-[#EC3237]"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-300 bg-white shadow-sm">
        <table className="w-full min-w-[1000px] border-collapse text-left">
          <thead className="bg-[#f9fafb]">
            <tr>
              {headerColumns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  className="cursor-pointer whitespace-nowrap border-b border-gray-200 px-6 py-4 text-sm font-semibold text-gray-700"
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    <ArrowUpDown size={16} className="text-gray-400" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedRows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                  No records match your search.
                </td>
              </tr>
            ) : (
              paginatedRows.map((item, index) => (
                <tr key={`${item.zone}-${item.id}-${index}`} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-5 align-top text-sm font-medium text-gray-800 whitespace-nowrap">
                    {item.zone}
                  </td>
                  <td className="px-6 py-5 align-top text-sm text-gray-700">
                    <div className="font-semibold text-gray-900">{item.name}</div>
                    {item.address ? (
                      <div className="mt-1 text-sm text-gray-500">{item.address}</div>
                    ) : null}
                  </td>
                  <td className="px-6 py-5 align-top text-sm text-gray-700 whitespace-nowrap">
                    {item.leader}
                  </td>
                  <td className="px-6 py-5 align-top text-sm text-gray-700 whitespace-nowrap">
                    {item.phone || "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="text-sm text-gray-600">
          Showing {Math.min((currentPage - 1) * entriesPerPage + 1, sortedRows.length)} to {Math.min(currentPage * entriesPerPage, sortedRows.length)} of {sortedRows.length} entries
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 bg-white text-gray-700 transition hover:bg-gray-100"
            disabled={currentPage === 1}
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`h-10 min-w-[2.5rem] rounded-xl border px-3 text-sm font-semibold transition ${
                  currentPage === page ? "bg-[#EC3237] text-white border-[#EC3237]" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 bg-white text-gray-700 transition hover:bg-gray-100"
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
