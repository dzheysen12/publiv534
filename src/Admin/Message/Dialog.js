import React, { Component } from 'react';

class Dialog extends Component {
    state = {
        items: [''],
    };

    addItem() {
        this.setState(prevState => ({
            items: [...prevState.items, '']
        }));
    }

    render() {
        // const { items } = this.state;

        // const content = (
        //   <Row type="flex">
        //     <Col lg={24} md={24} xl={18}>
        //   <div className={"setting__chat"}>
        //     <div className="chat__overlap">
        //       <div className="chat">
        //         <ScrollableFeed>

        //           {items.map((item, i) =>

        //             <div key={i} className="user__message">
        //               <div className="user__message--overlap">
        //                 <div className="avatar">
        //                   <div className="message__avatar">
        //                     <img src="/img/service/user__avatar.png" alt={"avatar"}/>
        //                   </div>
        //                 </div>

        //                 <div className="message__text">
        //                   <span>
        //                     Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        //                     A autem distinctio earum exercitationem facilis molestias
        //                     mollitia natus non quaerat, quis quos, repellat sapiente vitae.
        //                     Blanditiis esse fugit magnam placeat porro.
        //                   </span>
        //                 </div>
        //               </div>
        //             </div>
        //           )}

        //           <div className="robot__message">
        //             <div className="robot__message--overlap">

        //               <div className="message__text">
        //               <span>
        //                 Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        //                 A autem distinctio earum exercitationem facilis molestias
        //                 mollitia natus non quaerat, quis quos, repellat sapiente vitae.
        //                 Blanditiis esse fugit magnam placeat porro.
        //               </span>
        //               </div>

        //               <div className="avatar">
        //                 <div className="message__avatar">
        //                   <img src="/img/service/bot__avatar.png" alt=""/>
        //                 </div>
        //               </div>

        //             </div>
        //           </div>
        //         </ScrollableFeed>
        //       </div>

        //       <div className="chat__message--add">
        //         <div className="add__input">
        //           <Input placeholder={"Текс сообщения"}/>
        //         </div>

        //         <button
        //           onClick={() => this.addItem()}
        //           className="btn-send">
        //         </button>

        //       </div>
        //     </div>
        //   </div>
        //     </Col>
        //   </Row>
        // );

        return (


            <div>
                {/* <MenuLeft content={content}/> */}
            </div>

        )
    }
}

export default Dialog;
