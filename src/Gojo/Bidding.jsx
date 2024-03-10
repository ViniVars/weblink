import React from 'react'
import { read } from '../App'
import { update, ref } from 'firebase/database';
import { Button } from '@chakra-ui/button';
export default function Bidding({ db, id }) {

    async function bid(){

        let bid1, bid2, bid3;
        let nbid = document.querySelector('.bid').value;
        let Bid = await read(`Varshith/Products/${id}`)
        // console.log(postid)
        let date2 = new Date();
        let Bid1 = Bid.Time.toString().split('T')[0].split('-')
        if(date2.getMonth()+1 <= parseInt(Bid1[1])){
            console.log('Done')
        }
        console.log(date2.getDate(),date2.getMonth()+1, date2.getFullYear() )
        if(date2.getDate() <= parseInt(Bid1[2]) && date2.getMonth()+1 <= parseInt(Bid1[1]) && date2.getFullYear() <= parseInt(Bid1[0])){
            console.log(id)
            bid1 = Bid.Bid.Bid1.split('_')[0];
            bid2 = Bid.Bid.Bid2.split('_')[0];
            bid3 = Bid.Bid.Bid3.split('_')[0];
            if(nbid < bid3 || nbid < Bid.Base){
                return
            }
            else if(nbid == bid1 || nbid == bid2 || nbid == bid3){
                return
            }
            else if(nbid > bid1){
                bid3 = bid2;
                bid2 = bid1;
                bid1 = nbid;
            }
            else if(nbid > bid2){
                bid3 = bid2;
                bid2 = nbid;
            }
            else if(nbid > bid3){
                bid3 = nbid;
            }
            update(ref(db, `Varshith/Products/${id}`), {
                Bid : {
                    Bid1 : `${bid1}_User1`,
                    Bid2 : `${bid2}_User2`,
                    Bid3 : `${bid3}_User3`,
                }
            })
        }
        
    }
  return (
    <>
    <div className="biddingcontainer">

        <div className="bidcon">
            <input type="text" placeholder='Enter Your Bid' className='bid' />
        </div>
        <div className="bid-btncon">
            <Button className='bid-btn' colorScheme='green' borderRadius={12} width={150} mt={2} onClick={bid}>Bid</Button>
        </div>
    </div>
    </>
  )
}