import { useState, useEffect, useRef } from 'react';
import { FiPlus } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import ButtonAndIcon from '../button/ButtonAndIcon';
import SimpleInput from '../simpleInput/SimpleInput';
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

function ToolForm(props) {
  return props.data.map((layer, index) => (
    <aside
      id={`filter_${index}`}
      key={index}
      className="grid grid-cols-[2fr_3fr_1.2fr_1fr_0.2fr_0.2fr] gap-x-5 gap-y-2 my-2"
    >
      <Select
        options={options}
        value={layer.type}
        index={index}
        onChange={e => {
          props.setSelection(e, index, 'type');
        }}
      />
      <SimpleInput
        templateType="flexible"
        bgColor="bg-[#D0D0D0]"
        inputPosition="right"
        defaultValue={layer.power}
        onChange={e => {
          props.updateInput(e.target.value, 'power', index);
        }}
      />
      <Select
        options={units}
        index={index}
        value={layer.unit}
        onChange={e => {
          props.setSelection(e, index, 'unit');
        }}
      />
      <SimpleInput
        templateType="flexible"
        bgColor="bg-[#D0D0D0]"
        inputPosition="right"
        defaultValue={layer.quantity}
        onChange={e => {
          props.updateInput(e.target.value, 'unit', index);
        }}
      />
      <div
        role="button"
        className="w-[38px] h-[38px] bg-white grid place-items-center rounded-lg"
        onClick={() => props.onClickAdd()}
      >
        <FiPlus />
      </div>
      <div
        role="button"
        className="w-[38px] h-[38px] bg-white grid text-red-main place-items-center rounded-lg"
        onClick={() => props.onClickDelete(index)}
      >
        <AiOutlineDelete />
      </div>
    </aside>
  ));
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
  useEffect(async () => {}, [kva]);
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

  return (
    <section
      className="relative lg:px-super-indent px-indent-sm w-full py-10 bg-red-main"
      id="result_section"
    >
      <h2 className="text-white text-xl my-4">{content?.title}</h2>
      <aside className="grid lg:grid-cols-[2fr_3fr_1.2fr_1fr_0.2fr_0.2fr] gap-x-5 gap-y-2">
        <p className="text-white">{content?.electronicType}</p>
        <p className="text-white">{content?.power}</p>
        <p className="text-white">{content?.unit}</p>
        <p className="text-white">{content?.quantity}</p>
        <p className="text-red-main">Add</p>
        <p className="text-red-main">Delete</p>
      </aside>

      {/* Listing filters */}
      <ToolForm
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
      />
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
        />
      </span>
      <Result kva={kva} content={content} />
    </section>
  );
}

export default CalculationSection;
