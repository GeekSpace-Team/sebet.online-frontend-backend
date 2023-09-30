import React, { useContext } from 'react';

import "./about.css";
import Location from  '../../components/location';
import { SebedimContext } from '../../context/Sebedim';
const About = (props)=>{
    const {dil} = useContext(SebedimContext);
    return(
        <div className="about">
            <div style={{marginTop:"10px"}}>
                <Location name={dil=="tm"?"Ulanyş düzgünleri":"Условия пользования"} />
            </div>
            <h1>{dil=="tm"?"Ulanyş Düzgünleriniň we Gizlinligiň ÖZARA YLALAŞYGY":"Пользовательское соглашение"} </h1>
                <p>
               {dil=="tm"? "Sebet.Online - Internet onlaýn marketi (Mundan beýläk – “Sebet.Online”) "+
                "we www.Sebet.Online internet saýty (Mundan beýläk – “Saýt”) bilen, onuň" +
                "agzasynyň (“Agza”) arasynda aşakdaky şertleri ýerine ýetirmek barada ylalaşyga gelindi."
                :"Между Sebet.Online – Интернет Маркетом (далее – “Sebet.Online”) и интернет сайтом www.Sebet.Online (далее – “Сайт”), а также его клиентом (далее - “Клиент”) достигнуто соглашение по нижеследующим условиям."}
            </p>
            <h2>{dil=="tm"?"Umumy düzgünler":"Общие положения"}</h2>
            <ul>
                <li>{dil=="tm"?" Agza, Saýtda bellige alyş işlerini tamamlandan soň, şu Ylalaşykda bellenen "+
                    "şertlere eýermek bilen telefon belgisini we açar sözüni girizip, Saýty ulanmaga başlap biler."
                    :"Клиент после завершения регистрации на Сайте, соблюдая условия настоящего Соглашения, внося номер Телефона и ключевое слово, может начать пользоваться Сайтом."}</li>
                <li> {dil=="tm"?"Agzanyň Saýty ulanyp başlamagy Ylalaşygyň ähli şertlerini kabul edýär diýip hasaplanylýar."
                :"Начало пользования Сайтом означает, что Клиент принимает все условия."}</li>
                <li> {dil=="tm"?"Ylalaşyk, agzalygyňyzyň ýatyrylmagy bilen güýjini ýitirjekdir."
                :"Соглашение теряет силу с момента, как Клиент перестает пользоваться услугами Сайта"}</li>
                <li>{dil=="tm"?" Sebet.Online şu Ylalaşyga birtaraplaýyn üýtgetmeleri we goşmaçalary girizip biler."
                :"Sebet.Online может в одностороннем порядке внести изменения и дополнения в настоящее Соглашение."}</li>
                <li> {dil=="tm"?"Saýtyň belli ýerlerinde, umumy düzgünler, şeýle hem degişli bölüme laýyk başga şertler-de bellenilip biliner."+
                " Hyzmatlarymyzdan peýdalanýan Agza, degişli şertleri okan we kabul eden hasaplanýar."
                :"	На определенных страницах Сайта, общих положениях, а также в соответствующих разделах, могут быть установлены особые условия. Считается что Клиент, пользующийся нашими услугами, ознакомился и принял наши соответствующие условия."}</li>
            </ul>
            <h2>{dil=="tm"?"Agzanyň hukuklary we borçlary":"Права и обязанности Клиента"}</h2>
            <ul>
                <li> {dil=="tm"?"Saýt, ähli adamlaryň ulanmagy üçin açykdyr.":"Сайт открыт для общего пользования."}</li>
                <li>{dil=="dil"?"Agza, Saýty ulananda, Ylalaşykda bellenen ähli şertleri kabul edýär.":"Клиент, используя Сайт, принимает все установленные условия."}</li>
                <li>{dil=="tm"?"Agza, Saýtdan peýdalanan döwründe Türkmenistanyň kanunçylygyna laýyklykda hereket etjekdigine borçlanýar."
                :"Клиент во время пользования Сайтом обязуется действовать согласно законодательству Туркменистана."} </li>
                <li>{dil=="tm"?("Saýtyň içinde, şeýle hem sosial ulgamlarda operator bilen ýazyşmalaryň göçürmesiniň saklanmagy agzalaryň jogapkärçiligindedir."+
                    "Bu Sebet.Online tarapyndan maslahat berilýär. Ýazyşmalaryň göçürmesi saklanmadyk ýagdaýynda, ýitmeginden ýa-da pozulmagyndan Sebet.Online jogapkär däldir.")
                :"Клиент во время пользования Сайтом обязуется действовать согласно законодательству Туркменистана."}</li>
                <li>{dil=="tm"?"Sebet.Online ýa-da Agzanyň özi tarapyndan ýatyrylan agza, hasabyna degişli ýazgysyny, agzanyň garşy talabynyň bolmadyk ýagdaýynda, Sebet.Online ony pozmakda ýa-da pozmazlykda erkindir."
                :"Ответственность за сохранение копии переписки внутри сайта и с оператором возлагается на сотрудников сайта. Данное является рекомендацией Sebet.Online. В случае не сохранения копий переписки, Sebet.Online не несет ответственности за их утерю или не сохранение."}</li>
                <li>{dil=="tm"?"Agza, Saýta registrasiýa bolanynda ýa-da hyzmatlaryndan peýdalananynda şahsy we beýleki maglumatlarynyň dogrulygyny we bu maglumatlaryň dogry bolmadyk "+
                    "ýagdaýynda Sebet.Online-yň bu sebäpden görjek ähli zeperlerini tölejekdigini kabul edýär."
                :"Если сотрудничество прекращено Sebet.Online или Клиентом, то, если Клиент не против, право удаления или сохранения принадлежащей ему переписки остается за Sebet.Online."}</li>
            </ul>
            <h2>{dil=="tm"?"Sebet.Online-yň hukuklary we jogapkärçiligi":"Права и ответственность Sebet.Online"}</h2>
            <ul>
                <li> {dil=="tm"?"Agza, saýty ulanmak bilen bagly Türkmenistanyň kanunçylygyny we şu Ylalaşygyň şertlerini bozan"+
                     "ýagdaýynda Sebet.Online-yň birtaraplaýyn agzany agzalykdan çykarmaga hukugy bardyr."
                    :"	В случае, если Клиент используя настоящий Сайт, нарушит законодательство Туркменистана и условия настоящего Соглашения, то Sebet.Online имеет право в одностороннем порядке приостановить сотрудничество с данным Клиентом."}</li>
                <li>{dil=="tm"?" Agzalara, Sebet.Online tarapyndan saýta agza bolmagy bilen berilen ýa-da öz bellän agza "+
                   " ady, açar sözi ýaly maglumatlaryň ulanmagyny, başga adamlara beren ýagdaýynda, açar sözüniň" +
                    "başga adamalar tarapyndan ýaman niýet bilen ulanylmagyndan Agza jogapkärdir. Şeýle-de, Agza,"+ 
                    "internet äleminde başganyň IP adresini, e-poçta adresini we ulanyjy adyny ulanyp bilmeýändigi "+
                    "bilen birlikde, Agzalaryň şahsy maglumatlaryny rugsatsyz ulanyp bilmeýär. Ulanylan halatynda, "+
                    "ýüze çykjak ähli hukuk we jerime jogapkärçiliklerini Agza öz üstüne alýar."
                    :"Если логин, пароль и прочая информация, переданная Клиенту, необходимая для пользования услугами настоящего сайта будет передана третьим лицам и с их стороны данная информация будет использована для незаконных целей, то за их действия ответственность несет данный Клиент. А также, как и в интернет пространстве Клиент не может использовать посторонний IP-адрес, адрес электронной почты и имя пользователя, так и здесь, без разрешения не может быть использована личная информация Клиента. В случае использования, за все возникающие правонарушения полную ответственность несет Клиент."}</li>
            </ul>
            <h2>{dil=="tm"?"Alynan maglumatlar we olaryň ulanylyşy":"Полученная Информация и ее Использование "}</h2>
            <p>{dil=="tm"?"Saýtyň hyzmatlaryndan ulanýan döwrüňizde we/ýa-da saýtymyza agza bolan ýagdaýyňyzda, size ýokary hilli "+
                "hyzmat bermek üçin adyňyz, familiýaňyz, e-poçta adresiňiz, telefon belgiňiz, jynsyňyz, doglan günüňiz, "+
                "eltip berme adresiňiz ýaly käbir şahsy maglumatlaryňyza zerurlyk ýüze çykýar. Saýtda alynan maglumatlar "+
                "aşakdaky maksatlar üçin ulanylýar:"
                :"В период пользования услугами Сайта и/или если Вы являетесь Клиентом нашего Сайта, для оказания Вам высококачественных услуг, необходимо указать Ваше имя, фамилию, адрес электронной почты, пол, дату рождения и адрес доставки. Информация, получаемая на Сайте используется для нижеуказанных целей:"}</p>
            <ul>
                <li>{dil=="tm"?"Siziň hususy hasabyňyzy döretmek.":"Для ведения Вашего личного учета."}</li>
                <li>{dil=="tm"?"Sargydy ýerine ýetirmek, tamamlamak we müşderilerimiz bilen aragatnaşyk saklamak.":"Для выполнения заказа и сохранения связи с нашими Клиентами."}</li>
                <li>{dil=="tm"?"Sargytlar, hyzmatlar we arzanladyşlar hakda maglumat bermek.":"Информировать Вас о заказах, услугах и скидках."}</li>
                <li>{dil=="tm"?"Müşderilerimiziň söwda saýlawlaryny has gowy bilmek we olara teklipler hödürlemek.":"Для изучения спроса Клиентов и возможности делать им соответствующие предложения."}</li>
                <li>{dil=="tm"?"Trend seljermeleri we statistik seljermeler etmek.":"Для осуществления трендового и статистического анализа."}</li>
            </ul>
            <h2>{dil=="tm"?"Hukuklaryňyz haýsylardyr?":"Для осуществления трендового и статистического анализа."}</h2>
            <p>{dil=="tm"?"Bizde saklanan şahsy maglumatlaryňyz hakda maglumat almaga hukugyňyz bardyr. "+
                "Maglumatlaryňyz ýalňyş ýa-da doly däl bolsa, maglumatlaryňyzyň düzedilmegini "+
                "ýa-da aýrylmagyny talap edip bilersiňiz. Biziň bilen aşakdaky ýollar arkaly habarlaşyp bilersiňiz:"
            :"Вы имеете право получить данные о Вашей  личной информации, хранящейся у нас. Если информация недостоверна или не в полном объеме, то Вы можете потребовать ее исправления или удаления. Вы можете связаться с нами по нижеуказанным адресам:"}</p>
            <h3>{dil=="tm"?"Websaýt: sebet.online":"Вебсайт: sebet.online"}</h3>
            <h3>{dil=="tm"?"Telefon: ":"Телефон:"}<br></br>
                 +99365584800 <br></br>
                +99342230660</h3>
            <h3>{dil=="tm"?"Salgysy: Türkmenabat şäheri, Magtymguly Pyragy köçesiniň ugrunda":"Адрес: город Туркменабад, вдоль улицы Махтумкули Фираги"}</h3>
            <h3>{dil=="tm"?"E-mail: hergun.2015@mail.ru":"Э-почта: hergun.2015@mail.ru"}</h3>
            <p>{dil=="tm"?"(Müşderi Hyzmatlary, hepdäniň 7 güni 09:00 - 18:00 sagatlar arasynda hyzmat berýär.)"+
                "Ýokarda ýazylan şertleri okadym, düşündim, kanuna we hukuklaryma laýyklykda hereket "+
                "etjekdigime borçlanýaryn."
            :"(Услуги Клиентам 7 дней в неделю с 09:00 по 18:00 часов.)"+
            "Потверждаю, что ознакомился с вышеуказанными условиями, понял и обязуюсь их исполнять согласно законодательству."}</p>
        </div>
    );
};

export default About;