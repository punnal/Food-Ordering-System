
const express = require("express");
const path = require("path");

// import express from 'express'
// import path from 'path'
// import menuItem from 'src/dummyFiles/menujson'
// import dealsItem from 'src/dummyFiles/dealsjson'

const app = express();

const Gallery = {
    "data" : {
        pictures: [
                    {id:1,link:"https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-5-600x900.jpg"}, 
                    {id:2,link:"https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-5-600x900.jpg"},
                    {id:3,link:"https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-5-600x900.jpg"}
        ]//response.data
    }

}

const Deals = 
{
    "data" :
    {
        "$id" : 
        {
            "name" : "big mega deal 1",
            "id" : 100,
            "photo_url" : "https://fastly.4sqi.net/img/general/200x200/65819168_dM36zilRc8ZgKUprvGBAWi6Kf0MeTkN91ts734kOfaA.jpg",
            "price" : 1000,
            "items":
            [
        
                {
                    "id" : 41,
                    "name" : "big burger",
                    "options_lists" : //will contain all options lists. keys would represent names for the optin list
                    [
                        {
                            "Sauce":  // key representing option list name
                            {              //value representing the options_lists themselves
                                "Honey mustard" : 20, // key represents the option. value represents additional price
                                "Garlic Mayo" :10
                            }
                        },

                        {
                            "Add-on":
                            {
                                "Mushrooms" : 50,
                                "Jalepnos" : 60
                            }
                        }
                    ],
                    "category" : 0         
                },  

                {
                    "id" : 42,
                    "name" : "fries",
                    "options_lists" : //will contain all options lists. keys would represent names for the optin list
                    [
                        {
                            "Type":  // key representing option list name
                            {              //value representing the options_lists themselves
                                "Curly" : 50, // key represents the option. value represents additional price
                                "Onion rings" :50
                            }
                        },

                        {
                            "Upsize":
                            {
                                "large" : 40,
                                "Extra large" : 60
                            }
                        }
                    ],
                    "category" : 0         
                },  
                
                {
                    "id" : 44,
                    "name" : "Pepsi",
                    "options_lists" :
                    [

                    ],
                    "category" : 0         
                }  
        
            ]
        }
    }
}
const MenuData = {
    "data" :
    {
       "Main" :
        {
            
            "$id" : 
            {
                "id" : 41,
                "name" : "big burger",
                "price" : 999,
                "description" : "juicy",
                "photo_url" : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxATEhAQEBAVEBAVGRUbGBUVGRcQEBASIB0iIiAdHx8kKDQsJCYxJx8fLTItMSsuMDAwIys1QD8uNzQ5MC4BCgoKDg0OGBAQGisaHR4tLS0rKysrKysrKystLjc3LSsrNzctKzcvLS0tLSstKy0tKy0tLSstLS0tLi0tLS0tLf/AABEIAMgAyAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAADAAIEBQYHAQj/xAA+EAACAQIEBAQEAwYEBgMAAAABAhEAAwQSITEFBkFREyJhcTKBkaEjQrEHFFLB0fAVQ2LxM1NUcoLhFiQ0/8QAGgEAAgMBAQAAAAAAAAAAAAAAAQMAAgQFBv/EAC0RAAICAQQCAQIEBwEAAAAAAAABAhEDBBIhMUFRExRhIjJSoRVCcYGR0fAF/9oADAMBAAIRAxEAPwDRKKKopqiiKKUQLbFSUFBtipFsUSBkFHQUJBRlqxAqUVaGtEWoQKtPFMWnioQIKcKYKcDUIPBr2aaDSmiQdNKabNImoQRNeE14TTSahBE0w0iaaTQIeMaExpzGhMagRjGhMaIxoTGoAE9KvHpUAlQBRFFeAU9RQAFQVIQUFKOlEgZBRloSUVaJAq0RaGtEWoQItEFMApyxtNS6IPFOBpAAiQ1CB7maCki21hpr0U9UBildRp2kdOlF2CjxUJNMbeJp1gkCXH0G1ehkLRB94gVWy20YqyCdgKbp3omItCIn5TUSyGUmQWH2FRyoKjYULtrAPWh3YBiQaDiL5bYCBuBqah/vSyNJ9DS3lousLZOI7UJjRcPcEFshVCNZP6UKzjrTHwspUnY70FnQPifgE1Cc1KtWc2YEEFep61Hu2iNxTFkTFuLQBq8rxqVWAV6iiKKaBT1oFQqUdKClHSiEMtEWhrRFokCrXt66EEttQnxNtATcMCoFviYuMQykouoUD9ay5tTGDpdj8eCUlb6J+I4mWUeGpgbmNK8weKtjVgXf12oZxqZSiJE/OPagWbB0jrWKWp57s1RwquVRM/etSBoOw6VIsXBpOh7UFLItsDcE+g1o8hnDspCnT2HrV453/crKK/sI8Qc+ZYAHQ0jjHjUnXtsKM9lBOUTAnvQlvsy5AoQdxrR+SS7YEovpCXig00MKPMdvp3pNxUMfwzBHfUUz9zEQJpDAkCB9KHzZQ7MYy5iNczNLaxGwpr8ShcsE+oNFw9hZZjEINQRM/wBxTLmGzr4qqEAkFR19aDlPbaCtl0xlvH5QCsT26Gqo3TudySfbXarDBXltlyUz+v8ADSfDG60qBJ2C6AD370tzlJcPn0Mjti3a49ke3jYVlK+ID9RQrTLcZNPCb+If0p2JwrISGEHegLa8wmRrSvlknTG7YtWiZf8AFuG4imLltZzAwT6RWfwXF8QklpdZI12+tbLhuEs2i7owObudfnWVxfEGHjILcW2dvIw+EzuK0Te1J3yJx1JtVwXdm5YuqvhuC5Ex1mvaob1hMP4eNw7ZlEB1J8w70qdHUOuRMtOr4JQFPWminitxhCpRloKUZaJAq1Fx+PyCFEk/Sn4u7lRmqI2J8REULAG56k1h1up+OO1ds16bDvdvogXpZWZjLGncJDrmE/FEj0qSQqMpb4QRNS8NLk3IiWn/AMe1cRN1fk6cpJKq4D4TDVY27W1LBWiTI29elSxZAAIMsddKfixtqzHky80MtWCxk6xtNTBYFCt3APl0qQHBrfijCvuZ5SZHtWQgeYg/U+lMS2FqTctgkHrXht9dqLi+kugKQyQNxApjXR5curGZHp3ojjSWMxQbzjQjQ7dpouTS/wCsi5GYrDBoJ0PpsffvTb9tRbYs2UHoD8Rr3xiGyuIPTt9ajYkLroJOnrS3KK5GpN0j29cCK1qNWEknZVP89DUF7boc6Aj9KfiLrt53IzkDRfhWoWLx914zsMgjRQVk+utZ8slffXQ/HB/7CviHdgXM6R2ihXB0EfWIqHisUQRqY7dJoC4/XaP51kc23yaVjpcFnxqxaAUMpF2RA1YHuQaobgCysySdST1q7wF0XhcN5gLNkAzsxkaCfSovLOItNcuG4BBQ5c397xWiUdzXhMpCThF+aKHiWHBss+cAAjyzqflSrzipsnN4JzKANTqM/WKVGMtqobV8mjFEWmCniu8efCrRVoS0ZKJAV/h73SCWy2wdfWn38N4akrGUaA96Pjbp/d3I0CnX1qpx3GQ6IgGUKPvXD1u3e2+zo6dy2qujxfMRPmPXqKul4ukZHTIdMpHwj3rNWcaAdxRcPzILWYMucHcVlwza49mjJBy8Gnt3Z0DGD20oz3HUF7SeIRpExr21rIJxxTlVRLNqANZPWh4nmXwzkfMnWNRNOx5GnVC3gbNmuMDsHZCq7bzrUhMSp823QD2rmqc1lhlALAbADNFQbvOGRipbK06q0yKYsk3LoHwR9nXP3xde4qM+OQq7h/h9dPauRYrnUEQHE+kiotvmcscqmQ51A0zayATNPvI1yivwwXk67iuL21gFtT9qjXeK24ytcEHvoRXJsZzFc1UAEnoDBHoNarU5jeMoDx66n61VY5vmwp4V5OrJx03HyM+bKDBA1b3omK4xZS22ZwbxkATqvy/nXKP8WZlVWQKAxPiHyOJ0jN/vUbGcU8NwHOaIMzKuPXSaiwNvvkv8uI6hd4uNPMJ96jtxMTMj1rBX+azeGRMLbE6fhrlYexolnFl2kgIIgKryR69f1pM9K12xi1WJGvu8QUzr/UVXXuJaiDptrUXBcHv+JmuqTh95BAy9QG99qlcdw6X3V7TKrgQUJyC72g7A9NaX8cIumyPWwukepjMwYZzlPQHQn1rzEXhlg7VS3LWKtW3u3MM1i3bCzmgSCQAR33qpbjyxv1pv0zf5eifUx9mywAzW7yDVgBlA3Jr2o3KWAuOlzEXAyB1IUenRqVYs2dY57UzPk1dPg24py0wGnrXqDmhloqUJKKtEhnec+L+Dby5iM5GnesRj+LvbVWkFG6g1vecOCLibBGzLqCK4qMJcFw23kwdO1Yc2CLncjXi1GyNFpe5lY6AmaZZ4pevZocDKNZ0kVI5fw9sYkZ7YYZSD2mN61GB5SS6S2HXRtCNgPQ0ieTFj4orLVZJdGUwvEQrAl3LLr5BGvaal8QxiXrLuhY3VgwSS29azDfsqvMR4mKWyn8NoSR8zV7b/AGc2VgLcLEgBnaMxUfzpGTU4Y8p2yt5Xy2ZHk/EWWw3lMXV1uKfiJ7j0oPF8ZhWb8W0rkaSSVf2kV0Thn7PcJaYvLsxBBAORSDvoKt7PKuCWIw1vTuuYz7msvzQ+RyV8kUX5Zw3Grhrtm8tmwEdAGUrM7gQSd6p+D8Hxlxs1lCGSDJgR/WvpG7wLDMMpsrHYCJqVY4ZaVciWlVewAFPhrppOMFbfvkjj9z55xy8Tn/8AKpI3Nu2Hn33qxxf70jslrCK7ZUzMiG5kuFQWAO2hmu6twezGttTT0wNsbIo9gBUebLwpQS/yBQicEwvJ3EMV57tp1SNMxhp9B0ouM5MxrPJw9wxAnKkMABpM/LbpXfVtjanXciiWpsMuWVvhJE2ro4JZ5KxuW4osFFeQNVlR9ajtgrnDlm9b8a6SMqKYUDuTB+ldpbmDBZspuIp9dPpQeKXuHAHE3WtsFEySGFUeXI/TX+AvC/RiOA8TxuMtut6wlhGBgrJZvKQAZ95+VZ7Bcn8WaLrKI7ZtR8q67wq7hb1sNZg2mmI0661ZW7KAQNqzrPkUpcLn9grFXZx/i/D7ps3LN5sisirlJ1NzODp7AGlyzyXg1dXKG6+kBjKg94rzjHDr9/EtcacwJ07Cdq1PLmGKaTD/AGpeTUNQUYyq/RmdtlvjLIQADU7ZY2r2i4y+0qjCGbQHpSrnZIx3cIYotlYDT1NRhcpwuV7kWTUNFU1DS5RkuUQkoiQRXOuO8vOLrXVWBvXQVuVz3nDm+4WexaTyqfM/p2pGfHvS5otGLkzJ2SwvSGgSdRXQuU+IOm8KASxB/Oux+lc34hnFtWAIBzTp5h2nsKteE4iFLKSzQkSSpEkyD06d6yajSqce+TXigovo7zY82vSpSWuwqv5Zx9u/aRlPQSDoVPYir4RXM0n/AJ6ypyk65KZJtOgC2qGBNPxN9V3YDprWC5p/aJZsFrWG/GujQlfNbtn1P8qZmwQ3qEFddghGUjcXrttBLuB84qpu804ZSQLm3UAsPrXObuJvXgGulxcYTJmMh7DSNxtVh4WVVtkAyTqJ06T7bU9aZpfp/oPjij55Lji3NeIaFwoAmPMwLHr+WKqLvM2Mlc12QJzeGuvtsfsaHxXANdKAA24Kw4MSxjUnsJ0Hp61WO/4pXNJBE3I+BcoAA7E6+0etaYaZKPPJb8K4os+C88XRmW8+bqCwHlHqVFe8T487KXa41zbyqYGXrAAgn3qO3DbF4nMpzCFJHw6trqN+tJ8FbtgoYAAMFtJMRt20qqwxi7SL8EK2HusxuoSkALliSRB+8fao+Fs2rhus1gOLZAUGCQxO501+nStthMHh/wB1UWAM6iSRoZjoR71WYhAgA0zn4mkFo2Mnr709w8lVO+D21jDoLDBQROQDIw118vSoeO4linuoli6dzmBYpJE7CN9qjYpNBeMHSJBifXX0oOHw+IZRew6i8VzFgxHlAOhjr/elI+JNu0XtJEjC8UxsPK/iGQCVBfbWf61UYHjmMtXml1vndgx+A+hrR2wxtkjRm0lT5HOsx/X0rEcXw6gXBmUkGZ0BLARAO8QarHS4ubiuRTgn4LXmfmriGa2Vu21VTKhFnN7z+mlKspj8UITNGwgA5h6n0pU1aeH6f2JUEdVF6ni9VWL1PF+txzS2S7Rku1UpfoyX6IS0e75WgwYNcw4Y5zXi2pLkEkSp13PauhLdnTvXOMfdGGxVy3IysZE7a7g0vLyuDRp2t1M0x4USVbOM0g5ehnT9Ki4jhKWldV0nYjyZtdIHSoPDuJxdAuORkBjX71KtXw7ljczGRDFoB9Kz3wa65LXkPips40WC2l1YImQLgGm/zFdB49zNZwyy7EufhRdWY/09a4vxzFot0k6ecnMPiHzqrOLY/jF3u3swB8Q5iFjoT+lZMmk3z3J0vJVxT5ZtuP8AMWJuspvkWbBP/DVsrusxqTvv6bVGxWNwNyxct4e34fh5SrlQrMNAZGuuvzqqwTtfK+OyWw2mVFGgndoAg1KvoFzLbZLltHljmDOV019QdO/tpWmGOONVFFl2W3DsZ5AjNHhjWdR1BkaESDvXpxkq1zVApOpHldxsB/vWdxtlbgUlsrzGZQQmWZAMdPQDrVUmMug2yFOWSS05s2kEa7xV0rQW6Zvk4p+EpFwvJEpPmB02gzA32rO38dmvF4Y20K6QMoM6kxvVbYvW7oYFwqkAFWEsdZ01GgqJi76pbhXOaTswgtO8bxB61deivHZpcDxhyLwUSrNoCfh/1fPSnYPiWRjr4msHWQbe+5/s1mjisRkg/hhtwNj01E7jb0qVw5MoJJRcp1LEFmBOmk0NvIbTRvcZjFs2klQCyjQHU9h7d6znE+PSHAAOpIXcqgEmIGwmqPjGPuyirdJOubbMx2k+noarOIuASgaIWSSQ0mNesUXG2VTpcmlxWLa5ANwKpOp+GUnTSrXC461h7F03A96WAGUebQag9hvr61iOGYhyRcOgUfET6dPtFN4linNskXGmZI7yYmZ9BQ2uwtpo2PEuZbYUCy2iKcq7KFI7jcz+lZEYu4/iGAxIYDO0RPaeuv6VAw6lFLrLTpML03AE7T1qRxPG3F/DZcpUaiR8WvbpqdPerxjTKOXBHxsssrqi9yI9Y+YpVEtsGP4jGO3pXlME22dPFyni5UUNTg1WMxNS5RluVBV6KtyoQsLdysfzdw4PeZs4D5QQD1rWWLTnZTVDzvwd3trcCkuvQHUrQkuC8HTMVatkllLKpHQnf2NFs33KsBJA7dPWq1FdWAKsW/hIrdcpcjYu5F0xaU99SRS2kaN9GbxOMd0ytqCZ2Gb11iaFZtnQQNu/Wuop+yNSxb96dJ6BVMGh4/8AY9dIHhYwE9mt5PuCf0qKLonypvs59g75tkgtCt8Uiam3HsYgW4trbuAakNkDR1M9dhAq4x/7MOK25YJaxI7I+Vo9nAFUl3lXiCatgriEblioT7UHCuWXU4skW8Sgz2RAfXzsc1plGukazpFRsSVtkQFiNVBzIr6ajvMDftUQcIv/AJrbAa9QaG+Fc+UK2bpOuagkui1vsNfxtsoJYM8mFCDRZP5tP7iqguWczPSNY9qtbHLGPf4cHdI75YEe9XXC/wBmuOunzG1YHXM4Zh8lmr8Ip/UzNwwMoukqOskoSe1NTEBASdSSIg6xp9P966E37M8NaAN/E3Lrdrai2v1M1BxPLmESctr5sxcmlTyxj2Px4nLow1vEr4gZ/MB0nT5n+lCx2JVvKsSTqwGUEdAPStonC7ImLa/QGnPw62IOQHUDRRp6+gpa1Mb4QyenqLblwY4cSAQIiBT1Yb1EuuWO56b+mldHxXA/DUEqArGFIjUbzUO9w1RsNaK1K9CliUlafBh7OLVSog5fzbCfbTShYq/nuMwmCTEmSJrZca4aQqNdtoGgQT5HcawIXfYanXWq4XnskeHYtW5J8wliRA01n3q6zpq0jFLJ4M9icO9tilwFW0JBBU6iRSrRcUxQxeUuIuosf96jp70qvHKmvxcMido0uanBqCGr0NTRRIV6IL+XzbxQLak7CaiuxDHN8NKyZVFBj2rOg8K4navWpSA4Gq9aqsRiGuuVIyxvWOweJZGz2mIHery1zM35lBPfY1l+p3Kmdf6O/wAWPkn4fgiG74lyIHpvWts8ZsWwAz5RoBpp7VgH5kJOiiO29CxfE7lwIA+Uf6RBB6QaW8+3oRqNO8cd0zqa8wYZQS13L7iKanOmA/6kA+oYfyrn2I5ed2UXb4W4wnLm8Vi0ddRrQb3KF8aBlYdDqKH8RrsrjxaaStzpnVsFzFhLseHibTT0zAN9DrVorKRpBHpXCX5axQ8ptZh/pKtQFwOKs5gmI8DLGb8YWgnvBp0NfGX3DLS4f5ch3DGcKw9z47Sk94E/WqHGcF8OTZJUfwrCn61mOU+brrObb8Qs3VUf5gGYx2aRPzmrXiHFsfc8S1ZVFckhLv5HtwJYASZExqKmXU437TM8W4Ok7RXcw8VPhGwjtmeVcsTKJsR7nas3hLdxAGtu9sawRB23J61P4hw1sJae/j7we5cMJbTz5o33id9dBFZfBXcROdF1gnceUes7Vkc8mR36KzjKcriuDStzIxAS6wFwfm/K47is3xfjJLM1ogrbKmSJB6ER21H0rUYXlAm2L9y4FstBKkCEn/Ufeg4rk6xct+HbvfhjfwwuZzM+Ztf7iqfVQupkeeezYzIvx8EqwthVYAN5tiJ1X67Gl/iRuKttwrEmYRtgOpO1b3h/JGCZV/ADMo3ZmnTvBiqjG8qWbVybSiRJZQf8sb6E1I6nDLiKYp5J7Wr4ZnuZOJm3fS2HmyFBSNipAg+vamWOPq3kVGdvfb7bVtf8JsFAvhqRAgHzZT/f61krrpaa5aFnxCsh8ggXDPwz0FMxZYZI0l0Ow55KOxKy7t3MLina9cuscqAICAmW91aBuNBHvWdvgNYuksM6MToPL6e06/an8PwN++4UWTmb8qgwF/UD1ow4S9q3iPFQtbDOsI2QjtMjUa1ZcOr4KLTZW+jM4TGp4iMNSCCQOtKrDh6Wlt5VsNnJBZydl9O9Kmzmr4TKPDkXgvhXooStTxXSAWHC74VxOxq04vwmbD3EExr8qzkVbnme2tjwQpLxGu1cvWaeTmpxKszXCbVxyQBqdAKXF7FzDx4g37VecOv28NZa+B4l8/lH5aosTi3xatefZY8oE0uMXe5rg16XNkhL8LpBuCgaXX0SGIB1M+1RsbjbhYrbgDqT5iKvMBi8MLOlss43IMBffSsth7svcMwSdO1CEd0m6LZpyyZLnzRqcFzC04YX7CNZTTy5h/5RsTXSXxFtrSXMOFYEaCYAH03rn/B+Ds6hmIjsBvWw4Zwo2rWhIB1htNY6CserioxtIRljFcoz93nEW74s3rZCAw7Azl+XWs3z/iLF7Ef/AF3Ny3GsCE8SI076Cncx27ZxBynNIEkd9ZpmHwpkALPWnYIQglNd0NxY1wymwuGZYZRDDYxMVZYWziFdL2ZjcX4WkgpPar/B4QsIJgT0irZOEJEl2I7aQd+h+VNeW2bFS7RS4y/icRctvf8AxCoAHl0j2GkmpzLcgRayxEEKV03irDDYbLIABPceX7UW67D8xn3NIc/bGRdcJE7h3EFu4W5hroyhE1ZjAMzr8tK59geK37NzOGzLOqEnI47elaDGliZJkGqi9Y+IkCB3oRSbd82U+CNtvyaPgvONhQzXkZDr5VBZSOgB7+9ZbmLjlzE3SR5LcyoIAdfdqim1r6f+6dc2gAHT6DrTIYoxdpFPp4Gm4WGX8IkvliSplW67/Oqu3aU3LpOhk6DY/wBxVeeZLyBbSZVCrlMDVtIBNQsJiiDprVFhlFyfstpcDxybZsbGPe2hW28ZoBjQnSo4xAEk67abgxtNVi4hiFJ+lMe/FLcWujpKK7onYq7bMkIB8oilVZdvkilRUWTbEh5qKj0EURBXpDy5JU0/F4K29skKcwnUUxO9eXcVCsD2NZc8pXSJRTZCbbKrkN+tLljNYe4WYhCjAgEa9vvUfB3GDEiljLpMwIBpbtrb4HQxtk/GYs+Ay27du2znzMsyfl0rMYR3UiG2PWtBYslrcHp96q1wpViCNathSimguNSo3nCuOXxbGVEK6TBhqicV5oxewt6f9/Sqzh905cpOnfrVtd4ExXMHkEUqWOLfKLNqPZkbvF7uafD19DNWWH5lvDQWAfWdaZieDurbinWsE+2/pTXiVflLRn9yXZ5ruiYw0n32qUedcR/0xj3qBZ4bckwAPepIs3h+RaW9Mv0jFlXs8/8Am2JmP3cgeja/pUtuZyVIZiG6CGaT6mo62nH+WDXl3DnokT1pUsUV/KNhk+5HPM10MwKFoO42NRsTzG5H/Cb7UW7hI2EGoV6042WrxxwfSA8jBnjjf8pvtUR+LOZGQge9SBh7h1y004c6yNaescV2ivyt9Mh/v7fwmnpxK7/D96d4Ouo0o1q0Z2qPb6LxlL2JeJX+ij60rmOxRGwFT7dnQaU42qTuin+Uetz8lPcvYoj49PSlVs9gxSqyyL0ijg/bJq0RTXlKt5yB+eomIBNKlVJxTQV2Q7Vs0UWJ3pUqzUdKPCDIkaCoz2DM17Sqj4YjP2mTLWCeAR3rX4JGS2Ax1rylS5O6RmyOzM8bzeIIrzChgRNKlW3H4RF0WJxQFR3x3avKVMyN0WglY+zizOtSXxApUqxTVqzVEj3bZYEgaCqW5ijNKlVMT5D2FtYhmEAVFxNwzBEGlSprk26FpUw4wEgd6bhrQBIPSlSrPubtFsMm2T0tSNOlMKb0qVL8m4BcvLqJpUqVNSQlydn/2Q==",
                "options_lists" : //will contain all options lists. keys would represent names for the optin list
                [
                    {
                        "Sauce":  // key representing option list name
                        {              //value representing the options_lists themselves
                            "Honey mustard" : 20, // key represents the option. value represents additional price
                            "Garlic Mayo" :10
                        }
                    },

                    {
                        "Add-on":
                        {
                            "Mushrooms" : 50,
                            "Jalepnos" : 60
                        }
                    }
                ],
                "category" : 0         
            }  
        },

        "Extras" :
        {
            "$id" : 
            {
                "id" : 42,
                "name" : "fries",
                "price" : 50,
                "description" : "Fried",
                "photo_url" : "https://www.budgetbytes.com/wp-content/uploads/2020/01/Spicy-Sweet-Potato-Fries-close-side-200x200.jpg",
                "options_lists" : //will contain all options lists. keys would represent names for the optin list
                [
                    {
                        "Type":  // key representing option list name
                        {              //value representing the options_lists themselves
                            "Curly" : 50, // key represents the option. value represents additional price
                            "Onion rings" :50
                        }
                    },

                    {
                        "Upsize":
                        {
                            "large" : 40,
                            "Extra large" : 60
                        }
                    }
                ],
                "category" : 0         
            }  
        },

        "Drinks" :
        {
            
            "$id" : 
            {
                "id" : 44,
                "name" : "Pepsi",
                "price" : 50,
                "description" : "Dizzy",
                "photo_url" : "https://kathmandumart.com/image/cache/catalog/beer/Corona%20Extra%20Beer%20355ML-200x200.jpg",
                "options_lists" :
                [

                ],
                "category" : 0         
            }  
        },
    }
}

app.use(express.static(path.join(__dirname, "build")));

app.get("/api/menu", (req, res) => {
    console.log(res)
    res.send(MenuData)
})

app.get("/api/deals", (req, res) => {
    res.send(Deals)

})

app.get("/api/gallery", (req, res) => {
    res.send(Gallery)

})


app.post("/api/orders", (req, res) => {
    console.log("POST", req)
})

app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
})


app.listen(9000)
