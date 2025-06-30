import React, { useState, useEffect } from 'react';
import { Modal, TextField, Select, MenuItem, FormControl, InputLabel, Button, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DateTimePicker } from '@material-ui/pickers';
import { validateIP } from '../utils/validators';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    borderRadius: '10px',
    width: '500px',
    '&:focus': {
      outline: 'none',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%',
  },
  submitButton: {
    marginTop: theme.spacing(2),
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    color: 'white',
  },
}));

const ServerForm = ({ open, handleClose, onSubmit, initialData }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: '',
    ip: '',
    role: 'worker',
    environment: 'Desarrollo',
    pciCompliant: false,
    clusterId: null,
    certExpiry: null
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Nombre es requerido';
    if (!validateIP(formData.ip)) newErrors.ip = 'Dirección IP inválida';
    if (formData.role === 'master' && !formData.certExpiry) {
      newErrors.certExpiry = 'Fecha de vencimiento es requerida para servidores master';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose} className={classes.modal}>
      <div className={classes.paper}>
        <Typography variant="h6" gutterBottom>
          {initialData ? 'Editar Servidor' : 'Agregar Servidor'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nombre del Servidor"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            margin="normal"
          />
          
          <TextField
            fullWidth
            label="Dirección IP"
            name="ip"
            value={formData.ip}
            onChange={handleChange}
            error={!!errors.ip}
            helperText={errors.ip || "Formato: xxx.xxx.xxx.xxx"}
            margin="normal"
          />
          
          <FormControl className={classes.formControl} margin="normal">
            <InputLabel>Rol</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <MenuItem value="master">Master</MenuItem>
              <MenuItem value="worker">Worker</MenuItem>
            </Select>
          </FormControl>
          
          {formData.role === 'master' && (
            <DateTimePicker
              fullWidth
              label="Vencimiento Certificado Kubernetes"
              value={formData.certExpiry}
              onChange={(date) => setFormData({...formData, certExpiry: date})}
              minDate={new Date()}
              format="dd/MM/yyyy HH:mm"
              margin="normal"
              error={!!errors.certExpiry}
              helperText={errors.certExpiry}
            />
          )}
          
          <FormControl className={classes.formControl} margin="normal">
            <InputLabel>Ambiente</InputLabel>
            <Select
              name="environment"
              value={formData.environment}
              onChange={handleChange}
            >
              <MenuItem value="Desarrollo">Desarrollo</MenuItem>
              <MenuItem value="Calidad">Calidad</MenuItem>
              <MenuItem value="Produccion">Producción</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl className={classes.formControl} margin="normal">
            <InputLabel>PCI Compliance</InputLabel>
            <Select
              name="pciCompliant"
              value={formData.pciCompliant}
              onChange={handleChange}
            >
              <MenuItem value={true}>PCI</MenuItem>
              <MenuItem value={false}>NPCI</MenuItem>
            </Select>
          </FormControl>
          
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={handleClose} style={{ marginRight: '10px' }}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              className={classes.submitButton}
            >
              Guardar
            </Button>
          </Box>
        </form>
      </div>
    </Modal>
  );
};

export default ServerForm;