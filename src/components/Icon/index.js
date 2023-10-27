const Icon = ({ icon }) => {
  return (
    <img
      src={`https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/reactbase/ka/${icon}.svg`}
      alt="icon"
      style={{
        width: 20,
        height: 20
      }}
    />
  )
}

export default Icon
