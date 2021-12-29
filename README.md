# Fixes
If StandardFirmataWIFI returns an error similar to
```` 
```
friend void FirmataMarshaller::encodeByteStream (size_t bytec, uint8_t * bytev, size_t max_bytes = 0) const;
```
````
replacing the default Firmata library with the one included here should fix it