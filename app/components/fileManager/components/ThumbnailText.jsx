export default function ThubnailText(props) {
  return (
    <span>{breakUpWords(props.text)}</span>
  )
}

function breakUpWords(str) {
    let text = str.split(' ');

    for (let i = 0; i < text.length; i++) {
      let word = text[i];
  
      if (word.length > 18) {
        let brokenWord = word.match(/.{1,10}/g).join(' ');
  
        text[i] = brokenWord;
      }
    }
  
    let result = text.join(' ');
    
    if (result.length > 30) {
      result = result.slice(0, 27) + '...';
    }
  
    return result;
}