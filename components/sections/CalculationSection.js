import { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import ButtonAndIcon from '../widgets/ButtonAndIcon';
import SimpleInput from '../reusables/SimpleInput.jsx';
import styles from '../../styles/CalculationSection.module.scss';

const options = [
  { value: 'motor', label: 'Motor' },
  { value: 'ac', label: 'Air Conditioner' },
  { value: 'heater', label: 'Water Heater' },
  { value: 'light', label: 'Light Bulbs' },
  { value: 'computer', label: 'Computers' },
];
const units = [
  { value: 'kw', label: 'kW' },
  { value: 'w', label: 'Watt' },
  { value: 'hp', label: 'HP (Horse Power)' },
  { value: 'btu', label: 'BTU' },
  { value: 'tonne', label: 'Tonne' },
];

const layers = [
  { type: 'ac', power: 10, unit: 'kw', quantity: 1 },
  { type: 'heater', power: 14, unit: 'kw', quantity: 2 },
];

// function ToolForm(props) {
//   return props.data.map((layer, index) => (
//     <aside
//       id={`filter_${index}`}
//       key={index}
//       className="grid md:grid-cols-[0.2fr_2fr_3fr_1.2fr_1fr_0.2fr_0.2fr] gap-x-5 gap-y-2 my-2"
//     >
//       <div className="flex justify-center items-center">
//         <p className="text-white text-xl">{index + 1}.</p>
//       </div>
//       <Select
//         options={options}
//         value={layer.type}
//         index={index}
//         onChange={e => {
//           props.setSelection(e, index, 'type');
//         }}
//       />
//       <SimpleInput
//         templateType="flexible"
//         bgColor="bg-[#D0D0D0]"
//         inputPosition="right"
//         defaultValue={layer.power}
//         onChange={e => {
//           props.updateInput(e.target.value, 'power', index);
//         }}
//       />
//       <Select
//         options={units}
//         index={index}
//         value={layer.unit}
//         onChange={e => {
//           props.setSelection(e, index, 'unit');
//         }}
//       />
//       <SimpleInput
//         templateType="flexible"
//         bgColor="bg-[#D0D0D0]"
//         inputPosition="right"
//         defaultValue={layer.quantity}
//         onChange={e => {
//           props.updateInput(e.target.value, 'unit', index);
//         }}
//       />
//       <div
//         role="button"
//         className="w-[38px] h-[38px] bg-white grid place-items-center rounded-lg"
//         onClick={() => props.onClickAdd()}
//       >
//         <FiPlus />
//       </div>
//       <div
//         role="button"
//         className="w-[38px] h-[38px] bg-white grid text-red-main place-items-center rounded-lg"
//         onClick={() => props.onClickDelete(index)}
//       >
//         <AiOutlineDelete />
//       </div>
//     </aside>
//   ));
// }

function ToolForm(props) {
  return (
    <aside
      id={`filter_${props.index}`}
      key={props.index}
      className="grid md:grid-cols-[0.2fr_2fr_3fr_1.2fr_1fr_0.2fr_0.2fr] gap-x-5 gap-y-2 my-2"
    >
      <div className="flex justify-center items-center">
        <p className="text-white text-xl">{props.index + 1}.</p>
      </div>
      <p className="lg:hidden md:hidden flex text-white">{props.content?.electronicType}</p>
      <Select
        options={options}
        value={props.data?.type}
        index={props.index}
        onChange={e => {
          props.handleSetSelection(e, props.index, 'type');
        }}
      />
      <p className="lg:hidden md:hidden flex text-white">{props.content?.power}</p>
      <SimpleInput
        templateType="flexible"
        bgColor="bg-[#D0D0D0]"
        inputPosition="right"
        defaultValue={props.data?.power}
        onChange={e => {
          props.handleUpdateInput(e.target.value, 'power', props.index);
        }}
      />
      <p className="lg:hidden md:hidden flex text-white">{props.content?.unit}</p>
      <Select
        options={units}
        index={props.index}
        value={props.data?.unit}
        onChange={e => {
          props.handleSetSelection(e, props.index, 'unit');
        }}
      />
      <p className="lg:hidden md:hidden flex text-white">{props.content?.quantity}</p>
      <SimpleInput
        templateType="flexible"
        bgColor="bg-[#D0D0D0]"
        inputPosition="right"
        defaultValue={props.data?.quantity}
        onChange={e => {
          props.handleUpdateInput(e.target.value, 'quantity', props.index);
        }}
      />
      <div
        role="button"
        className="w-[38px] h-[38px] bg-white lg:grid md:grid place-items-center rounded-lg hidden"
        onClick={() => props.handleAdd()}
      >
        <FiPlus />
      </div>
      <div
        role="button"
        className="w-[38px] h-[38px] bg-white lg:grid md:grid hidden text-red-main place-items-center rounded-lg"
        onClick={() => props.handleDelete(props.index)}
      >
        <AiOutlineDelete />
      </div>

      {/* mobile delete and add button */}
      <aside className='w-full flex justify-center items-center lg:hidden md:hidden'>
        <div
          role="button"
          className="w-[38px] h-[38px] bg-white grid place-items-center rounded-lg m-1"
          onClick={() => props.handleAdd()}
        >
          <FiPlus />
        </div>
        <div
          role="button"
          className="w-[38px] h-[38px] bg-white grid text-red-main place-items-center rounded-lg m-1"
          onClick={() => props.handleDelete(props.index)}
        >
          <AiOutlineDelete />
        </div>
      </aside>
    </aside>
  );
}

function Select(props) {
  return (
    <select
      value={props.value}
      className={styles.selector}
      onChange={e => {
        props.onChange(e.target.value);
      }}
    >
      <option value="" />
      <Option options={props.options} />
    </select>
  );
}

function Option(props) {
  return props.options.map((option, index) => (
    <option key={index} value={option.value}>
      {option.label}
    </option>
  ));
}

function Result({ kva, content }) {
  useEffect(async () => { }, [kva]);
  // console.log(kva)
  if (!kva) return <></>;
  return (
    <div className="text-white text-center">
      <h2 className="text-3xl">{content?.resultTitle}</h2>
      <div>
        {content?.result}: {kva} KVA
      </div>
    </div>
  );
}

function CalculationSection({ content }) {
  const [filtersLayers, setFiltersLayers] = useState(layers);
  const [kva, setKva] = useState(0);

  function onAddNew() {
    console.log('adding');
    setFiltersLayers(oldArray => [
      ...oldArray,
      { type: '', power: 0, unit: '', quantity: 1 },
    ]);
  }

  function onDelete(index) {
    console.log('deleting');
    const newArr = [...filtersLayers];
    newArr.splice(index, 1);
    setFiltersLayers(newArr);
  }

  function setSelection(value, index, changeType) {
    const state = [...filtersLayers];
    state[index][changeType] = value;
    setFiltersLayers(state);
  }

  function updateInput(input, field, index) {
    const data = [...filtersLayers];
    data[index][field] = input;
    setFiltersLayers(data);
  }

  const apiEndpoint = '/api/tools/generator-power/';

  async function calculateKVA() {
    // console.log('calculate KVA')
    const res = await fetch(apiEndpoint, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: filtersLayers }),
    });
    const data = await res.json();
    // console.log(data)
    const returnedKva = data?.totalKva || '';
    setKva(returnedKva);
  }


  const Form = ({ content }) => filtersLayers.map((row, index) => {
    return (
      <ToolForm
        key={index}
        data={row}
        index={index}
        content={content}
        handleAdd={() => {
          onAddNew();
        }}
        handleDelete={index => {
          onDelete(index);
        }}
        handleSetSelection={(e, i, changeType) => {
          setSelection(e, i, changeType);
        }}
        handleUpdateInput={(input, field, i) => {
          updateInput(input, field, i);
        }}
      />
    );
  });

  return (
    <section
      className="relative lg:px-indent px-indent-xsm w-full py-10 bg-red-main"
      id="calculation"
    >
      <h2 className="text-white text-xl my-4">{content?.title}</h2>
      <aside className="hidden md:grid lg:grid md:grid-cols-[2fr_3fr_1.2fr_1fr_0.2fr_0.2fr] gap-x-5 ">
        <p className="text-white">{content?.electronicType}</p>
        <p className="text-white">{content?.power}</p>
        <p className="text-white">{content?.unit}</p>
        <p className="text-white">{content?.quantity}</p>
        <p className="text-white">Add</p>
        <p className="text-white">Delete</p>
      </aside>

      {/* Listing filters */}
      {/* {JSON.stringify(filtersLayers)} */}
      {/* {Form} */}
      <Form content={content} />
      {/* <ToolForm
        data={filtersLayers}
        onClickAdd={() => {
          onAddNew();
        }}
        onClickDelete={index => {
          onDelete(index);
        }}
        setSelection={(e, i, changeType) => {
          setSelection(e, i, changeType);
        }}
        updateInput={(input, field, i) => {
          updateInput(input, field, i);
        }}
      /> */}
      <div className="h-[0.2px] bg-white w-full my-10" />
      <span
        onClick={() => {
          calculateKVA();
        }}
      >
        <ButtonAndIcon
          scrollLink
          to="result_section"
          title={content.buttonLabel}
          justify="center"
          theme="white"
          txtColor="white"
        />
      </span>
      <Result kva={kva} content={content} />
    </section>
  );
}

export default CalculationSection;
