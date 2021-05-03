import React, { useState } from 'react'
import { Form, Radio } from 'semantic-ui-react'

function CustomRadioGroup(props) {

  const { labels, labelsTitle } = props;
  const [label, setLabel] = useState(null);

  const handleChange = (event, { name, value, label }) => {
    sessionStorage.setItem(name.toLowerCase(), value);
    setLabel(label);
  };

  let k = 1;
  return (
    <Form>
      <Form.Field key={labelsTitle + '-hdr'} style={{ textAlign: 'left', fontSize: '18px', fontFamily: 'Open Sans', fontWeight: '600' }}>{labelsTitle}
      </Form.Field>
      {labels.map((i) => (
        <Form.Field key={labelsTitle + `${i}`}>
          <Radio
            style={{ textAlign: 'left', fontSize: '17px', color: '#203174', fontFamily: 'Open Sans' }}
            label={i}
            name={labelsTitle}
            value={k++}
            checked={label === i}
            onChange={handleChange}
          />
        </Form.Field>

      ))}
    </Form>
  );
}
export default CustomRadioGroup;