import Noty from 'noty';
import '../../../node_modules/noty/lib/noty.css';
import '../../../node_modules/noty/lib/themes/mint.css';

const noty = (text, type) => {
  new Noty({
    text: text,
    layout: 'bottomRight',
    progressBar: true,
    theme: 'mint',
    type: type,
    timeout: 3000,
    killer: true,
  }).show();
};

export default noty;
